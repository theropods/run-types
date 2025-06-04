import {
    BundledLanguage,
    BundledTheme,
    codeToHtml,
    createHighlighter
} from 'shiki/bundle/web'


async function highlight_code() {
    const highlighter = await createHighlighter({
        langs: ['html', 'css', 'js', 'json'],
        themes: ['github-dark', 'github-light'],
    })

    document.querySelectorAll('pre[lang]').forEach(pre => {
        pre.innerHTML = highlighter.codeToHtml((pre as HTMLElement).innerText, { lang: pre.getAttribute('lang') as string, theme: 'github-dark' })
    });
}

highlight_code();