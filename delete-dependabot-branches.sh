#!/bin/bash

# 删除所有 dependabot 分支的脚本
# 用法: bash delete-dependabot-branches.sh

echo "开始删除所有 dependabot 分支..."

OWNER="chengweiou"
REPO="vela2"

# 所有需要删除的分支
BRANCHES=(
  "dependabot/npm_and_yarn/acorn-6.4.1"
  "dependabot/npm_and_yarn/ajv-6.12.6"
  "dependabot/npm_and_yarn/async-2.6.4"
  "dependabot/npm_and_yarn/browserslist-4.16.6"
  "dependabot/npm_and_yarn/decode-uri-component-0.2.2"
  "dependabot/npm_and_yarn/dns-packet-1.3.4"
  "dependabot/npm_and_yarn/elliptic-6.5.4"
  "dependabot/npm_and_yarn/eventsource-1.1.1"
  "dependabot/npm_and_yarn/express-4.18.2"
  "dependabot/npm_and_yarn/follow-redirects-1.14.8"
  "dependabot/npm_and_yarn/highlight.js-9.18.5"
  "dependabot/npm_and_yarn/hosted-git-info-2.8.9"
  "dependabot/npm_and_yarn/http-proxy-1.18.1"
  "dependabot/npm_and_yarn/ini-1.3.8"
  "dependabot/npm_and_yarn/lodash-4.17.21"
  "dependabot/npm_and_yarn/path-parse-1.0.7"
  "dependabot/npm_and_yarn/pathval-1.1.1"
  "dependabot/npm_and_yarn/postcss-7.0.36"
  "dependabot/npm_and_yarn/qs-6.5.3"
  "dependabot/npm_and_yarn/shell-quote-1.7.3"
  "dependabot/npm_and_yarn/ssri-6.0.2"
  "dependabot/npm_and_yarn/tar-4.4.19"
  "dependabot/npm_and_yarn/terser-4.8.1"
  "dependabot/npm_and_yarn/url-parse-1.5.10"
  "dependabot/npm_and_yarn/websocket-extensions-0.1.4"
  "dependabot/npm_and_yarn/ws-6.2.2"
)

for branch in "${BRANCHES[@]}"; do
  echo "删除分支: $branch"
  gh api repos/$OWNER/$REPO/git/refs/heads/$branch -X DELETE 2>/dev/null && echo "✓ 已删除" || echo "✗ 删除失败或分支不存在"
done

echo "完成！所有 dependabot 分支已删除。"
