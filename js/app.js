// Obtiene el texto del input/textarea
const markdownInput = document.querySelector('#markdown-input');
// Selecciona el Ouput/preview
const htmlOutput = document.querySelector('#html-output');
// Seleciona el boton preview
const previewButton = document.querySelectorAll('.preview-button');
// Selecciona el boton emphasis
const emphasisButton = document.querySelectorAll('.emphasis-button');

// Obtiene texto del input textarea
function getText() {
    const text = markdownInput.value;
    return text;
}

// Inserta contenido en el output
function renderPreview(content) {
    htmlOutput.innerHTML = content;
}

// Conviete los encabezados
function convertHeadings(markdown) {
    let sizes = ["text-5xl", "text-4xl", "text-3xl", "text-2xl", "text-xl", "text-lg"];
    for (let i = 6; i >= 1; i--) {
        let regex = new RegExp(`^#{${i}} (.+)$`, "gm");
        markdown = markdown.replace(regex, `<h${i} class="${sizes[i - 1]}">$1</h${i}>`);
    }
    return markdown;
}

// Convierte las negritas y cursivas
function convertEmphasis(markdown) {
    return markdown
        .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
        .replace(/__(.+?)__/g, "<b>$1</b>")
        .replace(/\*(.+?)\*/g, "<i>$1</i>")
        .replace(/_(.+?)_/g, "<i>$1</i>"); 
}

// Convierte las listas ordenadas
function convertOrderedLists(markdown) {
    return markdown.replace(/(\d+\.\s.+(\n|$))+/g, match => {
        let items = match.trim().split("\n").map(line => line.replace(/^\d+\.\s*/, "<li>") + "</li>").join("");
        return `<ol class="list-decimal pl-6">${items}</ol>`;
    });
}

// Convierte las listas desordenadas
function convertUnorderedLists(markdown) {
    return markdown.replace(/([*-+]\s.+(\n|$))+/g, match => {
        let items = match.trim().split("\n").map(line => line.replace(/^[*-+]\s*/, "<li>") + "</li>").join("");
        return `<ul class="list-disc pl-6">${items}</ul>`;
    });
}

// Convierte el texto a html
function converterMarkdown(markdown) {
    markdown = convertHeadings(markdown);
    markdown = convertEmphasis(markdown);
    markdown = convertOrderedLists(markdown);
    markdown = convertUnorderedLists(markdown);
    return markdown;
}

// Muesta el texto en el Output
previewButton.forEach(button => {  
    button.addEventListener('click',() => {
        let text = getText();
        text = converterMarkdown(text);
        renderPreview(text)
    }) 
});

// Resalta/Desmarca los encabezados
emphasisButton.forEach(button => {
    button.addEventListener('click', () => {
        let headers = htmlOutput.querySelectorAll('h1, h2, h3, h4, h5, h6');
        console.log(headers)
        headers.forEach(header => {
            header.classList.toggle('font-bold');
            header.classList.toggle('text-red-600');
        });
        button.classList.toggle('bg-gray-800');
        button.classList.toggle('bg-red-600');
        button.classList.toggle('hover:bg-red-500');
        button.classList.toggle('hover:bg-gray-700');
    })
})