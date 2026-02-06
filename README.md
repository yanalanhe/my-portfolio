# Personal Portfolio Website

A clean, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## Features

- **Hero Section** - Eye-catching introduction with name and tagline
- **Projects Showcase** - Display of 2 recent works with descriptions and links
- **About Section** - Personal bio and skills
- **Contact Section** - Easy-to-find email and LinkedIn links
- **Fully Responsive** - Looks great on desktop, tablet, and mobile
- **Smooth Animations** - Subtle fade-in effects and hover interactions

## Project Structure

```
my-portfolio/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles with responsive design
├── js/
│   └── script.js           # Smooth scrolling and animations
├── images/
│   └── README.md           # Image requirements and tips
├── plan.md                 # Implementation plan
└── README.md               # This file
```

## Customization Guide

### 1. Update Personal Information

Open `index.html` and replace:
- `Your Name` with your actual name
- `Web Developer | Creative Problem Solver | Tech Enthusiast` with your tagline
- `your.email@example.com` with your email address
- `https://www.linkedin.com/in/yourprofile` with your LinkedIn URL

### 2. Add Your Projects

For each project in the projects section:
- Replace `Project Title 1/2` with your project names
- Update project descriptions
- Add live demo links (replace `#` in `href`)
- Add GitHub/code repository links

### 3. Customize About Section

- Update the bio paragraphs with your story
- List your actual skills and technologies
- Optionally add a profile photo

### 4. Add Images

Place your project screenshots in the `images/` folder:
- `project1.jpg` - First project screenshot
- `project2.jpg` - Second project screenshot

See `images/README.md` for detailed image requirements.

### 5. Customize Colors

Edit CSS variables in `css/styles.css` (lines 8-12):

```css
--primary-color: #2563eb;      /* Main accent color */
--primary-dark: #1e40af;       /* Darker shade for hovers */
--text-dark: #1f2937;          /* Main text color */
--text-light: #6b7280;         /* Secondary text color */
--bg-light: #f9fafb;           /* Light background */
```

## How to View Locally

1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (with http-server)
   npx http-server
   ```
3. Navigate to `http://localhost:8000`

## Deployment Options

### GitHub Pages
1. Create a GitHub repository
2. Push your code
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify
1. Sign up at netlify.com
2. Drag and drop your project folder
3. Site is live instantly with custom URL

### Vercel
1. Sign up at vercel.com
2. Import your GitHub repository
3. Deploy with one click

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Next Steps

- [ ] Add your personal information
- [ ] Upload project screenshots
- [ ] Customize colors and fonts
- [ ] Add more sections if needed (skills, testimonials, etc.)
- [ ] Test on different devices
- [ ] Deploy to web hosting

---

**Built with HTML, CSS, and JavaScript** - No frameworks, just clean code.
