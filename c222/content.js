// Variabilă pentru starea globală (Pornit/Oprit)
let extensionsEnabled = true;

function createGhostWindow(id, title, url, position) {
    const container = document.createElement('div');
    container.id = id;
    container.className = 'ghost-window-container'; 
    
    // Poziționare inițială
    if (position === 'left') { container.style.left = '20px'; } 
    else { container.style.right = '20px'; }
    container.style.bottom = '20px';

    container.innerHTML = `
        <div class="win-header">
            <span style="font-size: 11px; pointer-events: none;">${title}</span>
            <div style="display: flex; gap: 5px; align-items: center;">
                <button class="zoom-out" style="cursor:pointer; padding: 0 5px;">-</button>
                <button class="zoom-in" style="cursor:pointer; padding: 0 5px;">+</button>
            </div>
        </div>
        <iframe src="${url}"></iframe>
    `;

    document.body.appendChild(container);

    // Logică Zoom
    let currentZoom = 1;
    const iframe = container.querySelector("iframe");
    const applyZoom = () => {
        iframe.style.zoom = currentZoom;
        iframe.style.width = (100 / currentZoom) + "%";
        iframe.style.height = (100 / currentZoom) + "%";
    };

    container.querySelector(".zoom-in").onclick = () => { currentZoom += 0.1; applyZoom(); };
    container.querySelector(".zoom-out").onclick = () => { if (currentZoom > 0.5) currentZoom -= 0.1; applyZoom(); };

    // Logică Drag (Mutare)
    const header = container.querySelector(".win-header");
    let isDragging = false;
    let shiftX, shiftY;

    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        shiftX = e.clientX - container.getBoundingClientRect().left;
        shiftY = e.clientY - container.getBoundingClientRect().top;
        container.style.zIndex = "2147483647";
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        container.style.left = (e.clientX - shiftX) + 'px';
        container.style.top = (e.clientY - shiftY) + 'px';
        container.style.bottom = 'auto';
        container.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => { isDragging = false; });
}

// FUNCȚIA DE URGENȚĂ: Tasta 'Z'
document.addEventListener('keydown', function(event) {
    // Verificăm dacă tasta apăsată este 'z' sau 'Z'
    // Adăugăm o verificare pentru a nu se activa când scrii într-un câmp de text
    if (event.key.toLowerCase() === 'z' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        extensionsEnabled = !extensionsEnabled;
        const windows = document.querySelectorAll('.ghost-window-container');
        
        windows.forEach(win => {
            win.style.display = extensionsEnabled ? 'flex' : 'none';
        });
    }
});

// Pornire ferestre
// Schimbă URL-ul pentru fereastra din stânga cu ce site dorești
createGhostWindow('window-left', 'DOKU / INFO', 'file:///C:/Users/agust/Desktop/sesiune%20stuff/PTDEE/grile%20ptdee.html', 'left');
createGhostWindow('window-right', 'GEMINI AI', 'https://gemini.google.com/', 'right');