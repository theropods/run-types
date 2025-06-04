import {
    BundledLanguage,
    BundledTheme,
    codeToHtml,
    createHighlighter
  } from 'shiki/bundle/web'
  
  const highlighter = await createHighlighter({
    langs: ['html', 'css', 'js'],
    themes: ['github-dark', 'github-light'],
  })

const code = 'const a = 1' // input code
const html = await codeToHtml(code, {
  lang: 'javascript',
  theme: 'vitesse-dark'
})

console.log(html) // highlighted html string

function highlight_code(){
    document.querySelectorAll('pre').forEach(pre => {
        highlighter.
    });
}