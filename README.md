# ASCEND by Hossam — Website

موقع ASCEND الرسمي. مبني بـ **Next.js 15 + React 19 + TypeScript + Tailwind + next-intl** (عربي/إنجليزي).

---

## 🚀 التشغيل خطوة بخطوة (في VS Code)

### 1. المتطلبات
- **Node.js 18 أو أحدث** — تأكد بـ: `node --version`
  (لو مش متثبّت: نزّله من nodejs.org أو استخدم nvm)
- **VS Code** + إضافة Claude Code

### 2. ثبّت Claude Code (مرة واحدة)
في الـ terminal:
```bash
npm install -g @anthropic-ai/claude-code@latest
claude --version
```
(لو ظهر خطأ صلاحيات EACCES، لا تستخدم sudo — راجع docs.claude.com)

### 3. شغّل المشروع
افتح فولدر المشروع في VS Code، وفي الـ terminal:
```bash
npm install        # يثبّت الاعتماديات (أول مرة بس)
npm run dev        # يشغّل الموقع على http://localhost:3000
```
- الإنجليزي: http://localhost:3000/en
- العربي: http://localhost:3000/ar (يتحوّل تلقائيًا لـ RTL)

### 4. اشتغل مع Claude Code
في نفس الـ terminal:
```bash
claude
```
Claude Code هيقرأ ملف `CLAUDE.md` تلقائيًا — فيه كل قواعد البراند والخطة.
قوله مثلاً: *"اقرأ CLAUDE.md ونفّذ الخطوة 2 من الـ Roadmap"* — وهو يكمّل معاك.

---

## 📁 البنية
```
app/[locale]/      → الصفحات (layout + page) لكل لغة
components/         → Header, Footer
messages/           → النصوص (en.json / ar.json) — كل النصوص هنا
public/brand/       → اللوجو المعتمد
i18n.ts, middleware → نظام اللغتين
CLAUDE.md           → تعليمات Claude Code (اقرأها)
```

## ⚠️ قواعد مهمة
- **اللوجو مقفول** — استخدم `/public/brand/ascend_symbol_gold.svg` فقط، بدون تعديل.
- كل النصوص في `messages/` — متكتبش نص ثابت جوه أي component.
- الألوان والخطوط متعرّفة في `tailwind.config.ts` و `globals.css`.

## 🌐 النشر
الأسهل: ارفع المشروع على GitHub، وبعدين اربطه بـ Vercel (مجاني، بيدعم Next.js بالكامل).
