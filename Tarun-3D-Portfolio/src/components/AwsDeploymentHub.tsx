import React, { useState } from 'react';
import {
  Cloud,
  Check,
  Copy,
  Server,
  ShieldCheck,
  FileCode,
  Terminal,
  Zap,
  Globe,
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';
import { sound } from '../utils/audioSynth';
import { DeploymentConfig } from '../types/portfolio';

interface AwsDeploymentHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AwsDeploymentHub: React.FC<AwsDeploymentHubProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<DeploymentConfig>({
    bucketName: 'taruncl-portfolio-2026',
    region: 'us-east-1',
    customDomain: 'taruncl-portfolio-2026.s3-website-us-east-1.amazonaws.com',
    priceClass: 'PriceClass_100',
    enableBrotli: true,
    spaRouting: true
  });

  const [activeTab, setActiveTab] = useState<'cli' | 'policy' | 'cloudformation' | 'terraform' | 'github'>('cli');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 1. AWS CLI Shell Script
  const cliScript = `#!/usr/bin/env bash
# ==============================================================================
# AWS S3 + CloudFront Deployment Pipeline for 3D Motion Portfolio
# ==============================================================================
set -euo pipefail

BUCKET_NAME="${config.bucketName}"
REGION="${config.region}"
DISTRIBUTION_ID="E1XXXXXXXXXXXX" # Replace with your CloudFront Distribution ID

echo "==> Step 1: Building optimized production bundle..."
npm run build

echo "==> Step 2: Syncing immutable hashed assets (JS/CSS/WebP/Textures) with 1-year cache..."
aws s3 sync dist/assets s3://\${BUCKET_NAME}/assets \\
  --region \${REGION} \\
  --delete \\
  --cache-control "public, max-age=31536000, immutable"

echo "==> Step 3: Syncing root HTML and metadata with immediate revalidation cache..."
aws s3 sync dist s3://\${BUCKET_NAME} \\
  --region \${REGION} \\
  --exclude "assets/*" \\
  --delete \\
  --cache-control "public, max-age=0, must-revalidate"

echo "==> Step 4: Creating CloudFront edge cache invalidation for instant rollout..."
aws cloudfront create-invalidation \\
  --distribution-id \${DISTRIBUTION_ID} \\
  --paths "/*"

echo "==> Deployment complete! Live at: https://${config.customDomain}"
`;

  // 2. CloudFront OAC S3 Bucket Policy (JSON)
  const bucketPolicy = JSON.stringify(
    {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'AllowCloudFrontServicePrincipalReadOnly',
          Effect: 'Allow',
          Principal: {
            Service: 'cloudfront.amazonaws.com'
          },
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${config.bucketName}/*`,
          Condition: {
            StringEquals: {
              'AWS:SourceArn': `arn:aws:cloudfront::123456789012:distribution/E1XXXXXXXXXXXX`
            }
          }
        }
      ]
    },
    null,
    2
  );

  // 3. CloudFormation YAML Template
  const cloudFormationYaml = `AWSTemplateFormatVersion: '2010-09-09'
Description: 'Production AWS S3 and CloudFront CDN for 3D Motion Portfolio'

Parameters:
  BucketName:
    Type: String
    Default: '${config.bucketName}'
  DomainName:
    Type: String
    Default: '${config.customDomain}'

Resources:
  PortfolioS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketName
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256

  OriginAccessControl:
    Type: AWS::CloudFront::OriginAccessControl
    Properties:
      OriginAccessControlConfig:
        Name: !Sub '\${BucketName}-OAC'
        OriginAccessControlOriginType: s3
        SigningBehavior: always
        SigningProtocol: sigv4

  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Enabled: true
        Comment: 'Global CDN distribution for 3D Motion Portfolio'
        DefaultRootObject: index.html
        PriceClass: ${config.priceClass}
        Origins:
          - Id: S3Origin
            DomainName: !GetAtt PortfolioS3Bucket.RegionalDomainName
            OriginAccessControlId: !GetAtt OriginAccessControl.Id
            S3OriginConfig: {}
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          Compress: true
          AllowedMethods:
            - GET
            - HEAD
            - OPTIONS
          CachedMethods:
            - GET
            - HEAD
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
        # Single-Page Application (SPA) Error Fallback:
        CustomErrorResponses:
          - ErrorCode: 403
            ResponseCode: 200
            ResponsePagePath: /index.html
            ErrorCachingMinTTL: 0
          - ErrorCode: 404
            ResponseCode: 200
            ResponsePagePath: /index.html
            ErrorCachingMinTTL: 0

Outputs:
  CloudFrontDomain:
    Value: !GetAtt CloudFrontDistribution.DomainName
    Description: 'CloudFront CDN domain URL'
`;

  // 4. Terraform main.tf
  const terraformCode = `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "${config.region}"
}

resource "aws_s3_bucket" "portfolio" {
  bucket = "${config.bucketName}"
}

resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket                  = aws_s3_bucket.portfolio.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${config.bucketName}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name              = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id                = "S3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "${config.priceClass}"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
`;

  // 5. GitHub Actions Workflow
  const githubWorkflow = `name: Deploy 3D Portfolio to AWS S3 & CloudFront

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Bundle
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${config.region}

      - name: Deploy Assets with Long-Term Cache
        run: |
          aws s3 sync dist/assets s3://${config.bucketName}/assets --delete --cache-control "max-age=31536000, public, immutable"
          aws s3 sync dist s3://${config.bucketName} --exclude "assets/*" --delete --cache-control "max-age=0, must-revalidate"

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800/40 text-cyan-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>AWS S3 + CloudFront Deployment Studio</span>
                <span className="text-[11px] font-mono-code font-normal px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Global Edge CDN
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Optimized zero-downtime static delivery for 3D WebGL assets, shaders, and SPA routing.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Architecture diagram cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono-code mb-1">
                <Server className="w-4 h-4" />
                <span>1. Amazon S3 Bucket</span>
              </div>
              <p className="text-xs text-slate-300">
                Private object storage. Static web hosting disabled for security; accessible strictly via CloudFront OAC.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono-code mb-1">
                <Globe className="w-4 h-4" />
                <span>2. CloudFront CDN</span>
              </div>
              <p className="text-xs text-slate-300">
                450+ global edge locations. Automatic Brotli compression, TLS 1.3, and sub-30ms TTFB for 3D shaders.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono-code mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>3. Cache & SPA Fallback</span>
              </div>
              <p className="text-xs text-slate-300">
                1-year immutable cache for hashed Vite chunks. 403/404 redirects to /index.html for React routing.
              </p>
            </div>
          </div>

          {/* Quick Config Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-mono-code">S3 Bucket Name</label>
              <input
                type="text"
                value={config.bucketName}
                onChange={e => setConfig({ ...config, bucketName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono-code">AWS Region</label>
              <input
                type="text"
                value={config.region}
                onChange={e => setConfig({ ...config, region: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono-code">Custom Domain</label>
              <input
                type="text"
                value={config.customDomain}
                onChange={e => setConfig({ ...config, customDomain: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white font-mono-code focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          {/* Code Tabs */}
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('cli')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'cli' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  AWS CLI Deploy Script
                </button>
                <button
                  onClick={() => setActiveTab('policy')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'policy' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  S3 OAC Policy (JSON)
                </button>
                <button
                  onClick={() => setActiveTab('cloudformation')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'cloudformation' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CloudFormation (YAML)
                </button>
                <button
                  onClick={() => setActiveTab('terraform')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'terraform' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Terraform (main.tf)
                </button>
                <button
                  onClick={() => setActiveTab('github')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'github' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  GitHub CI/CD
                </button>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => {
                  const content =
                    activeTab === 'cli'
                      ? cliScript
                      : activeTab === 'policy'
                      ? bucketPolicy
                      : activeTab === 'cloudformation'
                      ? cloudFormationYaml
                      : activeTab === 'terraform'
                      ? terraformCode
                      : githubWorkflow;
                  handleCopy(content, activeTab);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors"
              >
                {copiedKey === activeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Viewer */}
            <pre className="p-4 rounded-xl bg-black/90 border border-white/10 text-xs text-amber-200/90 font-mono-code overflow-x-auto max-h-72 leading-relaxed">
              {activeTab === 'cli' && cliScript}
              {activeTab === 'policy' && bucketPolicy}
              {activeTab === 'cloudformation' && cloudFormationYaml}
              {activeTab === 'terraform' && terraformCode}
              {activeTab === 'github' && githubWorkflow}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-slate-400">
          <span>Tip: Always deploy hashed assets first before index.html for atomic zero-downtime releases.</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-colors"
          >
            Close Hub
          </button>
        </div>
      </div>
    </div>
  );
};
