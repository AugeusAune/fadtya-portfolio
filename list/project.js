// Lmao Pisan Kang

const icon = {
    html: "vscode-icons:file-type-html",
    css: "vscode-icons:file-type-css",
    bustrep: "devicon:bootstrap",
    js: "skill-icons:javascript",
    react: "skill-icons:react-dark",
    laravel: "devicon:laravel",
    php: "devicon:php",
    nuxt: "skill-icons:nuxtjs-dark",
    vue: "logos:vue",
    vuetify: "devicon:vuetify",
    element: "logos:element",
}

const { html, css, bustrep, react, laravel, php, js, nuxt, vue, vuetify, element } = icon;

const projects = [
    {
        title: "Procurement System (Indo Raya Tenaga)",
        imageSrc: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60",
        description: "Contract & Procurement System designed to manage contract lifecycle, purchase orders, and vendor relationships with automated approval workflows.",
        tech: ["skill-icons:elysia-dark", "logos:vue", "logos:nuxt-icon", "logos:postgresql"],
        linkProject: "#",
        isPrivat: true,
    },
    {
        title: "Tax Projection System (DSN Group)",
        imageSrc: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=60",
        description: "Automated VAT projection system combining OCR data from SPT documents with SAP financial data for 23 subsidiary entities.",
        tech: [laravel, vue, nuxt, "tabler:text-recognition"],
        linkProject: "#",
        isPrivat: true,
    },
    {
        title: "Compliance Management System (Patra Jasa)",
        imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60",
        description: "Centralized legal and compliance system managing COI, COC, and gratification forms integrated with employee KPI calculations.",
        tech: [laravel, vue, nuxt],
        linkProject: "#",
        isPrivat: true,
    },
    {
        title: "Tax Filling System (DSN Group)",
        imageSrc: "https://images.unsplash.com/photo-1454165833767-027ff39454d4?w=500&auto=format&fit=crop&q=60",
        description: "Internal system for managing tax documents leveraging OCR technology for automated reconciliation between physical documents and Excel sources.",
        tech: [laravel, vue, nuxt, "tabler:text-recognition"],
        linkProject: "#",
        isPrivat: true,
    },
    {
        title: "Tax BC System (DSN Group)",
        imageSrc: "https://images.unsplash.com/photo-1554224155-16726246836a?w=500&auto=format&fit=crop&q=60",
        description: "Web-based internal application integrating OCR (Tesseract) to extract text from tax documents and synchronizing it with SAP.",
        tech: [laravel, vue, "tabler:text-recognition"],
        linkProject: "#",
        isPrivat: true,
    },
    {
        title: "Compliance Group Info (Tugu Insurance)",
        imageSrc: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&auto=format&fit=crop&q=60",
        description: "Automated Compliance Management System replacing manual spreadsheets, reducing admin errors by 65%.",
        tech: [laravel, php],
        linkProject: "#",
        isPrivat: true,
    },
    {
        title: "Contract Management (Merdeka Gold)",
        imageSrc: "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=500&auto=format&fit=crop&q=60",
        description: "Digital organizational contract workflow streamline using Laravel API and Nuxt.js frontend with multi-level approval.",
        tech: [laravel, nuxt, vue],
        linkProject: "#",
        isPrivat: true,
    },
    {
        title: "Azuri Dental Profile",
        imageSrc: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&auto=format&fit=crop&q=60",
        description: "Company profile website for a distributor of medical and dental equipment.",
        tech: [laravel, vue],
        linkProject: "#",
        isPrivat: true,
    },
    {
        title: "File Management (Korpolairud)",
        imageSrc: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=500&auto=format&fit=crop&q=60",
        description: "Secure web-based file management system for uploading, managing, and downloading sensitive files.",
        tech: [php],
        linkProject: "#",
        isPrivat: true,
    },
];

export default projects;