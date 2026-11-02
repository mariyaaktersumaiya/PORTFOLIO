MARIYA PORTFOLIO PRO
====================

PAGES
- index.html    Home page with hero design and project slider
- about.html    Separate About Me page and profile image preview
- skills.html   Separate skills/toolkit page
- projects.html Separate projects page with working slider arrows and touch swipe
- contact.html  Separate contact page with form that prepares an email
- css/style.css Shared styles, responsive layouts, gradient details, dark/light theme
- js/script.js  Theme toggle, mobile menu, photo preview, project slider, contact form
- assets/profile-placeholder.svg Temporary portrait illustration

RUN
1. Extract the ZIP.
2. Open index.html in a browser, or open the folder in VS Code.
3. Keep all files and folders in the same structure.

ADD YOUR OWN PHOTO PERMANENTLY
1. Copy your portrait into assets/ and name it profile.jpg.
2. In index.html and about.html replace:
   src="assets/profile-placeholder.svg"
   with:
   src="assets/profile.jpg"
3. The Upload photo control previews an image in the browser only; it does not save it to files or upload it to a server.

CUSTOMIZE
- Change your name, bio, skills, education and project details in the relevant HTML page.
- Change the email in js/script.js (PORTFOLIO_EMAIL).
- Sample project cards are concepts, not verified live projects. Replace them with your real work, screenshots, GitHub links and live demo URLs.
- Skill percentages are illustrative placeholders; change them to match your experience.

CONTACT FORM
The form opens the visitor's email application with a pre-filled message. It does not automatically send or store messages. Automatic submission requires a backend or a form provider you configure.

TECH
HTML5, CSS3, vanilla JavaScript. No build tools needed. Google Fonts need internet access; fallback fonts are included.
