import game from "./components/Game";
import promptSync from 'prompt-sync'


// 1. Create one global handler
process.on('SIGINT', () => {
  console.log('\nExiting gracefully…')
  process.exit(0)
})

// 2. Enable sigint in prompt-sync so it actually throws on Ctrl+C
const prompt = promptSync({ sigint: true })

// 3. Pass this prompt into your Game (or import it there)
new game(prompt);