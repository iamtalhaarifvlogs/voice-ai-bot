
## **1. Welcome to Ember AI**

**Welcome!**
Thank you for purchasing Ember AI — your futuristic, voice-enabled AI assistant.
This guide will help you:

* Set up the app locally
* Configure the **Grok API**
* Use the **Local Bot**
* Navigate through **5 premium templates**
* Extend Ember AI with **custom knowledge, intents, and dialogues**

**Screenshot Placeholder:** *Main Hub with floating particle background*

---

## **2. Installation**

**Step 1: Clone or Download**

```bash
git clone <your-gumroad-download-link>
cd ember-ai
```

**Step 2: Install Dependencies**

```bash
npm install
# or
yarn
```

**Step 3: Start Local Development Server**

```bash
npm run dev
# or
yarn dev
```

**Screenshot/GIF Placeholder:** *Terminal running `npm run dev` and browser opening localhost:3000*

---

## **3. Main Hub Overview**

The **Main Hub** is your control center:

* **Template cards** — hover and click to open a template
* **Voice navigation** — speak a template name to instantly navigate
* **Voice-reactive particles** — background reacts to voice input

**Screenshot/GIF Placeholder:** *Hovering on “Futuristic Orb” card; orb pulsing*

**Tip:** The background and cards **react dynamically to voice volume** — speak louder to see particles and cards pulse more!

---

## **4. Grok API Setup (Cloud AI)**

**Step 1: Get API Key**

1. Go to [Grok AI](https://grok.ai/)
2. Sign up / login
3. Generate a new **API key**

**Step 2: Add to Project**

Create `.env.local` in project root:

```env
GROK_API_KEY=your_api_key_here
```

**Step 3: Restart Dev Server**

```bash
npm run dev
```

**Screenshot Placeholder:** *Showing `.env.local` with API key*

---

## **5. Using the Local Bot (Offline Mode)**

The Local Bot allows Ember AI to answer using **custom rules** without cloud.

**Adding Intents:**

Edit `components/ChatUI.tsx`:

```ts
const intents = [
  { trigger: "hello", response: "Hi! I'm Ember, your AI assistant." },
  { trigger: "time", response: `The current time is ${new Date().toLocaleTimeString()}` },
];
```

**Adding Dialogues:**

```ts
if (message.includes("weather")) {
  return "I can’t fetch live weather yet, but I can learn it!";
}
```

**Adding Knowledge Base:**

* Create `local-knowledge.json`:

```json
[
  { "question": "Who created Ember?", "answer": "Talha & Ember ❤️" }
]
```

* Load in `ChatUI.tsx` and match against user input

**Screenshot/GIF Placeholder:** *Local Bot responding to a custom intent*

---

## **6. Using Templates**

| Template         | Features                                            | Screenshot/GIF    |
| ---------------- | --------------------------------------------------- | ----------------- |
| Futuristic Orb   | Glowing orb, streaming AI, hover & voice animations | *GIF placeholder* |
| ChatGPT Style    | Clean chat interface, dual-mode AI                  | *GIF placeholder* |
| Jarvis HUD       | HUD interface, sci-fi green theme                   | *GIF placeholder* |
| Terminal Console | Terminal typing animations, retro look              | *GIF placeholder* |
| Floating Widget  | Always-on widget, floating interface                | *GIF placeholder* |

**Tip:** Each template supports **voice input/output** and reacts dynamically to **user speech and AI responses**.

---

## **7. Voice Commands**

* Speak the name of a template:

  * “Futuristic Orb” → navigates to that template
  * “Jarvis HUD” → navigates to Jarvis HUD
* Cards and particles react in **real time to your voice volume**
* Hover on a card + speak → double reactive fun

**Screenshot/GIF Placeholder:** *Voice command navigating to Jarvis HUD*

---

## **8. Extending Ember AI**

### Adding Templates

1. Create `/app/template-6/page.tsx`
2. Add card in `page.tsx` main hub:

```ts
{ id: 6, name: "New Template", href: "/template-6", color: "from-purple-400 to-purple-700" }
```

### Adding Local Bot Knowledge

* Extend `intents` array
* Load extra JSON knowledge

### Adding Voice Commands

* Extend `VoiceCommands.tsx` with more keywords or actions

### Custom Voices

* Replace `VoicePlayer.ts` to use different **speech synthesis voices**

---

## **9. Deployment Tips**

* Deploy on **Vercel**, **Netlify**, or any Next.js compatible host
* Make sure `.env.local` is added to production environment

**Screenshot Placeholder:** *Deploying on Vercel with environment variables*

---

## **10. Credits & Contact**

* Developed by **Talha Arif**
* Premium voice AI templates, reactive UI, and dual-mode intelligence

**Contact / Support:** [talhaarif1214@gmail.com]