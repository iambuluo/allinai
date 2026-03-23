#!/bin/bash
# AllInAI Daily Auto-Update Script
# Scrapes all 15 categories from ai-bot.cn and pushes to GitHub
# Vercel auto-deploys on push

set -e

PROJECT_DIR="/home/z/my-project/allinai"
DATA_DIR="/home/z/my-project/download"
TOOLS_FILE="$PROJECT_DIR/src/data/tools/zh.json"
LOG_FILE="/home/z/my-project/download/update-log.txt"

echo "=== $(date '+%Y-%m-%d %H:%M:%S') Starting AllInAI update ===" >> "$LOG_FILE"

# Categories to scrape
CATEGORIES=(
  "ai-writing-tools"
  "ai-image-tools"
  "ai-video-tools"
  "ai-office-tools"
  "ai-agent"
  "ai-chatbots"
  "ai-programming-tools"
  "ai-design-tools"
  "ai-audio-tools"
  "ai-search-engines"
  "ai-frameworks"
  "websites-to-learn-ai"
  "ai-models"
  "ai-content-detection-and-optimization-tools"
  "ai-prompt-tools"
)

# File name mapping
declare -A FILE_MAP
FILE_MAP["ai-writing-tools"]="ai-bot-writing.json"
FILE_MAP["ai-image-tools"]="ai-bot-image.json"
FILE_MAP["ai-video-tools"]="ai-bot-video.json"
FILE_MAP["ai-chatbots"]="ai-bot-chatbots.json"
FILE_MAP["ai-programming-tools"]="ai-bot-coding.json"

# Scrape each category
for cat in "${CATEGORIES[@]}"; do
  output_file="${FILE_MAP[$cat]:-ai-bot-${cat}.json}"
  echo "  Scraping $cat -> $output_file" >> "$LOG_FILE"
  
  z-ai function -n page_reader -a "{\"url\": \"https://ai-bot.cn/favorites/${cat}/\"}" -o "$DATA_DIR/$output_file" >> "$LOG_FILE" 2>&1
  
  sleep 3
done

echo "  All categories scraped" >> "$LOG_FILE"

# Extract tools from scraped HTML
python3 << 'PYEOF'
import json, re, os

def extract_tools(filepath):
    if not os.path.exists(filepath):
        return []
    with open(filepath) as f:
        data = json.load(f)
    html = data.get('data', {}).get('html', '')
    tools = []
    cards = re.findall(
        r'<a[^>]*href="(https://ai-bot\.cn/sites/[^"]+)"[^>]*>.*?<strong[^>]*>([^<]+)</strong>.*?<p[^>]*>([^<]+)</p>',
        html, re.DOTALL
    )
    for url, name, desc in cards:
        tools.append({
            'id': url.split('/')[-1].replace('.html', ''),
            'name': name.strip(),
            'url': url.strip(),
            'description': desc.strip(),
            'icon': f"https://favicon.im/{url.split('/')[2]}",
        })
    return tools

file_map = {
    'ai-writing-tools': 'ai-bot-writing.json',
    'ai-image-tools': 'ai-bot-image.json',
    'ai-video-tools': 'ai-bot-video.json',
    'ai-office-tools': 'ai-bot-ai-office-tools.json',
    'ai-agent': 'ai-bot-ai-agent.json',
    'ai-chatbots': 'ai-bot-chatbots.json',
    'ai-programming-tools': 'ai-bot-coding.json',
    'ai-design-tools': 'ai-bot-ai-design-tools.json',
    'ai-audio-tools': 'ai-bot-ai-audio-tools.json',
    'ai-search-engines': 'ai-bot-ai-search-engines.json',
    'ai-frameworks': 'ai-bot-ai-frameworks.json',
    'websites-to-learn-ai': 'ai-bot-websites-to-learn-ai.json',
    'ai-models': 'ai-bot-ai-models.json',
    'ai-content-detection-and-optimization-tools': 'ai-bot-ai-content-detection-and-optimization-tools.json',
    'ai-prompt-tools': 'ai-bot-ai-prompt-tools.json',
}

all_tools = {}
total = 0
for cat, fp in file_map.items():
    tools = extract_tools(f'/home/z/my-project/download/{fp}')
    all_tools[cat] = tools
    total += len(tools)
    print(f"  {cat}: {len(tools)} tools")

with open('/home/z/my-project/allinai/src/data/tools/zh.json', 'w', encoding='utf-8') as f:
    json.dump(all_tools, f, ensure_ascii=False, indent=2)

print(f"Total: {total} tools")
PYEOF

# Check if there are changes
cd "$PROJECT_DIR"
if git diff --quiet src/data/tools/zh.json; then
  echo "  No changes detected, skipping push" >> "$LOG_FILE"
  echo "=== $(date '+%Y-%m-%d %H:%M:%S') Update complete (no changes) ===" >> "$LOG_FILE"
  exit 0
fi

# Commit and push
git add src/data/tools/zh.json
git commit -m "chore: auto-update tools data $(date '+%Y-%m-%d')"
git push origin main >> "$LOG_FILE" 2>&1

echo "=== $(date '+%Y-%m-%d %H:%M:%S') Update pushed to GitHub ===" >> "$LOG_FILE"
