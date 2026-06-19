const siteHelper = (function() {
  const CONFIG = {
    baseUrl: "https://main-app-hth.com.cn",
    keywords: ["华体会", "体育赛事", "电竞", "真人娱乐", "棋牌游戏"],
    cardColors: ["#f0f9ff", "#fff7ed", "#f0fdf4", "#fef2f2", "#faf5ff"],
    badgeColors: ["#dc2626", "#2563eb", "#16a34a", "#d97706", "#7c3aed"]
  };

  function createBadge(text, index) {
    const badge = document.createElement("span");
    badge.textContent = text;
    badge.className = "keyword-badge";
    const bgColor = CONFIG.badgeColors[index % CONFIG.badgeColors.length];
    badge.style.cssText = `
      display: inline-block;
      padding: 4px 12px;
      margin: 4px;
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      background-color: ${bgColor};
      border-radius: 20px;
      white-space: nowrap;
      letter-spacing: 0.5px;
    `;
    return badge;
  }

  function createTipCard(title, description, index) {
    const card = document.createElement("div");
    card.className = "tip-card";
    const bgColor = CONFIG.cardColors[index % CONFIG.cardColors.length];
    card.style.cssText = `
      background: ${bgColor};
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 20px;
      margin: 12px 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      transition: box-shadow 0.2s;
    `;
    const titleEl = document.createElement("h4");
    titleEl.textContent = title;
    titleEl.style.cssText = `
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
    `;
    const descEl = document.createElement("p");
    descEl.textContent = description;
    descEl.style.cssText = `
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
    `;
    card.appendChild(titleEl);
    card.appendChild(descEl);
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
    });
    return card;
  }

  function createAccessNotice() {
    const notice = document.createElement("div");
    notice.className = "access-notice";
    notice.style.cssText = `
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 14px 18px;
      margin: 16px 0;
      font-size: 14px;
      color: #1e293b;
    `;
    notice.innerHTML = `
      <strong>🔗 访问说明：</strong>
      您可以通过 <a href="${CONFIG.baseUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">${CONFIG.baseUrl}</a>
      浏览完整内容。部分页面可能需要登录或注册账户。
    `;
    return notice;
  }

  function renderKeywords(container) {
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      padding: 8px 0;
    `;
    const label = document.createElement("span");
    label.textContent = "🏷️ 关键词：";
    label.style.cssText = `
      font-size: 14px;
      font-weight: 600;
      margin-right: 8px;
      color: #334155;
    `;
    wrapper.appendChild(label);
    CONFIG.keywords.forEach((kw, idx) => {
      wrapper.appendChild(createBadge(kw, idx));
    });
    container.appendChild(wrapper);
  }

  function renderTipCards(container) {
    const tips = [
      { title: "快速导航", desc: `点击顶部菜单或使用搜索功能查找您感兴趣的 ${CONFIG.keywords[0]} 专区内容。` },
      { title: "账户安全", desc: "请确保使用强密码并开启双重验证，切勿向他人透露密码或验证码。" },
      { title: "优惠活动", desc: "定期查看平台公告，参与限时活动可获取额外奖励与积分。" }
    ];
    const section = document.createElement("div");
    section.style.margin = "20px 0";
    tips.forEach((tip, idx) => {
      section.appendChild(createTipCard(tip.title, tip.desc, idx));
    });
    container.appendChild(section);
  }

  function init() {
    const container = document.createElement("div");
    container.id = "site-helper-root";
    container.style.cssText = `
      max-width: 720px;
      margin: 24px auto;
      padding: 12px 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;
    renderKeywords(container);
    renderTipCards(container);
    container.appendChild(createAccessNotice());
    document.body.appendChild(container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return {
    render: init,
    config: CONFIG
  };
})();