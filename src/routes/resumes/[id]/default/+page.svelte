<!-- src/routes/resumes/[id]/+page.svelte -->
<script>
    import { parse, format } from "date-fns";
    import { marked } from "marked";
  
    export let data;
    
    const { resume, profile, basics, summary, work, education, skills, projects, certificates, languages, volunteers, awards, publications } = data;
    
    // Helper function to format dates
    function formatDate(date) {
      if (!date) return 'Present';
      return date;
    }
  </script>
  
  <svelte:head>
    <title>{basics?.name || 'Resume'} - Professional Resume</title>
  </svelte:head>
  
  <div class="resume-container">
    <div class="resume-page">
      
      <!-- Header Section -->
      <header class="header">
        <h1 class="name">{basics?.name || profile?.candidate_name || 'Candidate Name'}</h1>
        
        <div class="contact-bar">
          {#if basics?.email || profile?.email}
            <span class="contact-item">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {basics?.email || profile?.email}
            </span>
          {/if}
          
          {#if basics?.phone || profile?.whatsapp_number}
            <span class="contact-item">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {basics?.phone || profile?.whatsapp_number}
            </span>
          {/if}
          
          {#if basics?.city || basics?.country_code}
            <span class="contact-item">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {basics?.city || ''}{#if basics?.city && basics?.country_code}, {/if}{basics?.country_code || ''}
            </span>
          {/if}
          
          {#if basics?.url}
            <span class="contact-item">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              <a href={basics.url} target="_blank" rel="noopener noreferrer" class="contact-link">{basics.url}</a>
            </span>
          {/if}
        </div>
      </header>
  
      <!-- Professional Summary -->
      {#if summary}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Professional Summary</span>
          </h2>
          <p class="summary-text">{@html marked(summary.summary)}</p>
        </section>
      {/if}
  
      <!-- Work Experience -->
      {#if work && work.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Professional Experience</span>
          </h2>
          
          {#each work as job, index}
            <div class="entry">
              <div class="entry-header">
                <div class="entry-main">
                  <h3 class="entry-title">{job.position}</h3>
                  <div class="entry-meta">
                    <span class="company">{job.company_name}</span>
                    <span class="separator">|</span>
                    <span class="dates">{job.start_date} - {job.end_date}</span>
                  </div>
                </div>
              </div>
              
              {#if job.summary && job.summary.length > 0}
                <p class="entry-description">
                   
                    {@html marked(job.summary[0].summary)}
                </p>
              {/if}
              
              {#if job.highlights && job.highlights.length > 0}
                <ul class="entry-list">
                  {#each job.highlights as highlight}
                    <li>{@html marked(highlight.highlight)}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Education -->
      {#if education && education.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Education</span>
          </h2>
          
          {#each education as edu}
            <div class="entry">
              <div class="entry-header">
                <div class="entry-main">
                  <h3 class="entry-title">{edu.study_type} in {edu.area}</h3>
                  <div class="entry-meta">
                    <span class="company">{edu.institution}</span>
                    <span class="separator">|</span>
                    <span class="dates">{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</span>
                    {#if edu.score}
                      <span class="separator">|</span>
                      <span class="gpa">GPA: {edu.score}</span>
                    {/if}
                  </div>
                </div>
              </div>
              
              {#if edu.courses && edu.courses.length > 0}
                <p class="coursework">
                  <strong>Relevant Coursework:</strong> {edu.courses.map(c => c.course).join(', ')}
                </p>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Skills -->
      {#if skills && skills.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Technical Skills</span>
          </h2>
          
          <div class="skills-grid">
            {#each skills as skill}
              <div class="skill-row">
                <strong class="skill-category">{skill.name}:</strong>
                {#if skill.keywords && skill.keywords.length > 0}
                  <span class="skill-items">
                    {skill.keywords.map(kw => kw.keyword).join(', ')}
                  </span>
                {/if}
              </div>
            {/each}
          </div>
        </section>
      {/if}
  
      <!-- Projects -->
      {#if projects && projects.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Projects</span>
          </h2>
          
          {#each projects as project}
            <div class="entry">
              <div class="entry-header">
                <div class="entry-main">
                  <h3 class="entry-title">{project.name}</h3>
                  <div class="entry-meta">
                    {#if project.start_date}
                      <span class="dates">{formatDate(project.start_date)} - {formatDate(project.end_date)}</span>
                    {/if}
                    {#if project.url}
                      <span class="separator">|</span>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" class="project-link">
                        {project.url}
                      </a>
                    {/if}
                  </div>
                </div>
              </div>
              
              {#if project.summary && project.summary.length > 0}
                <p class="entry-description">{project.summary[0].summary}</p>
              {/if}
              
              {#if project.highlights && project.highlights.length > 0}
                <ul class="entry-list">
                  {#each project.highlights as highlight}
                    <li>{highlight.highlight}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Certifications -->
      {#if certificates && certificates.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Certifications</span>
          </h2>
          
          <div class="compact-grid">
            {#each certificates as cert}
              <div class="compact-entry">
                <strong class="compact-title">{cert.name}</strong>
                <span class="compact-meta"> - {cert.issuer}, {formatDate(cert.date)}</span>
              </div>
            {/each}
          </div>
        </section>
      {/if}
  
      <!-- Volunteer Experience -->
      {#if volunteers && volunteers.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Volunteer Experience</span>
          </h2>
          
          {#each volunteers as vol}
            <div class="entry">
              <div class="entry-header">
                <div class="entry-main">
                  <h3 class="entry-title">{vol.position}</h3>
                  <div class="entry-meta">
                    <span class="company">{vol.organization}</span>
                    <span class="separator">|</span>
                    <span class="dates">{vol.start_date} - {vol.end_date}</span>
                  </div>
                </div>
              </div>
              
              {#if vol.summary && vol.summary.length > 0}
                <p class="entry-description">{vol.summary[0].summary}</p>
              {/if}
              
              {#if vol.highlights && vol.highlights.length > 0}
                <ul class="entry-list">
                  {#each vol.highlights as highlight}
                    <li>{highlight.highlight}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Awards -->
      {#if awards && awards.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Awards & Honors</span>
          </h2>
          
          <div class="compact-grid">
            {#each awards as award}
              <div class="compact-entry">
                <strong class="compact-title">{award.title}</strong>
                <span class="compact-meta"> - {award.awarder}, {formatDate(award.date)}</span>
                {#if award.summary && award.summary.length > 0}
                  <p class="compact-desc">{award.summary[0].summary}</p>
                {/if}
              </div>
            {/each}
          </div>
        </section>
      {/if}
  
      <!-- Publications -->
      {#if publications && publications.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Publications</span>
          </h2>
          
          {#each publications as pub}
            <div class="entry">
              <div class="entry-header">
                <div class="entry-main">
                  <h3 class="entry-title">{pub.name}</h3>
                  <div class="entry-meta">
                    <span class="company">{pub.publisher}</span>
                    <span class="separator">|</span>
                    <span class="dates">{formatDate(pub.release_date)}</span>
                    {#if pub.url}
                      <span class="separator">|</span>
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" class="project-link">
                        {pub.url}
                      </a>
                    {/if}
                  </div>
                </div>
              </div>
              
              {#if pub.summary && pub.summary.length > 0}
                <p class="entry-description">{pub.summary[0].summary}</p>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Languages -->
      {#if languages && languages.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Languages</span>
          </h2>
          
          <div class="languages-grid">
            {#each languages as lang}
              <span class="language-entry">
                <strong>{lang.language}:</strong> {lang.fluency}
              </span>
            {/each}
          </div>
        </section>
      {/if}
      
    </div>
  </div>
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
      font-family: 'Calibri', 'Arial', sans-serif;
      background: #ffffff;
      color: #000000;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  
    .resume-container {
      max-width: 8.5in;
      margin: 0 auto;
      background: #ffffff;
    }
  
    .resume-page {
      background: #ffffff;
      padding: 0.6in 0.75in;
      min-height: 11in;
    }
  
    /* ============ HEADER ============ */
    .header {
      text-align: center;
      margin-bottom: 20pt;
      padding-bottom: 14pt;
      border-bottom: 2pt solid #1a1a1a;
    }
  
    .name {
      font-size: 28pt;
      font-weight: 700;
      color: #000000;
      margin: 0 0 10pt 0;
      letter-spacing: 1pt;
      text-transform: uppercase;
    }
  
    .contact-bar {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8pt 16pt;
      font-size: 9.5pt;
      color: #333333;
    }
  
    .contact-item {
      display: flex;
      align-items: center;
      gap: 4pt;
    }
  
    .contact-link {
      color: #1a1a1a;
      text-decoration: none;
    }
  
    .icon {
      width: 11pt;
      height: 11pt;
      stroke-width: 2.5;
    }
  
    /* ============ SECTIONS ============ */
    .section {
      margin-bottom: 16pt;
      page-break-inside: avoid;
    }
  
    .section-title {
      font-size: 12pt;
      font-weight: 700;
      color: #000000;
      margin: 0 0 10pt 0;
      padding-bottom: 3pt;
      border-bottom: 1.5pt solid #1a1a1a;
      text-transform: uppercase;
      letter-spacing: 0.8pt;
      display: flex;
      align-items: center;
      gap: 8pt;
    }
  
    .title-icon {
      width: 4pt;
      height: 14pt;
      background: #1a1a1a;
      display: inline-block;
    }
  
    .summary-text {
      color: #1a1a1a;
      line-height: 1.55;
      font-size: 10pt;
      margin: 0;
      text-align: justify;
    }
  
    /* ============ ENTRIES (Work, Education, Projects) ============ */
    .entry {
      margin-bottom: 12pt;
      page-break-inside: avoid;
    }
  
    .entry-header {
      margin-bottom: 5pt;
    }
  
    .entry-main {
      display: flex;
      flex-direction: column;
      gap: 3pt;
    }
  
    .entry-title {
      font-size: 11pt;
      font-weight: 700;
      color: #000000;
      margin: 0;
      line-height: 1.3;
    }
  
    .entry-meta {
      font-size: 9.5pt;
      color: #333333;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6pt;
      line-height: 1.4;
    }
  
    .company {
      font-weight: 600;
      color: #1a1a1a;
    }
  
    .dates {
      font-style: italic;
      color: #4a4a4a;
    }
  
    .separator {
      color: #999999;
    }
  
    .gpa {
      font-weight: 600;
      color: #1a1a1a;
    }
  
    .entry-description {
      color: #1a1a1a;
      line-height: 1.5;
      font-size: 10pt;
      margin: 5pt 0;
      text-align: justify;
    }
  
    .entry-list {
      margin: 5pt 0 0 16pt;
      padding: 0;
      color: #1a1a1a;
      line-height: 1.55;
      font-size: 10pt;
    }
  
    .entry-list li {
      margin-bottom: 3pt;
      padding-left: 4pt;
    }
  
    .entry-list li::marker {
      color: #333333;
    }
  
    .project-link {
      color: #1a1a1a;
      text-decoration: none;
      font-size: 9pt;
    }
  
    .coursework {
      color: #333333;
      font-size: 9.5pt;
      margin: 5pt 0 0 0;
      line-height: 1.5;
    }
  
    /* ============ SKILLS ============ */
    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 6pt;
    }
  
    .skill-row {
      display: flex;
      gap: 8pt;
      font-size: 10pt;
      line-height: 1.5;
    }
  
    .skill-category {
      font-weight: 700;
      color: #1a1a1a;
      min-width: 120pt;
      flex-shrink: 0;
    }
  
    .skill-items {
      color: #333333;
      flex: 1;
    }
  
    /* ============ COMPACT SECTIONS (Certifications, Awards) ============ */
    .compact-grid {
      display: flex;
      flex-direction: column;
      gap: 7pt;
    }
  
    .compact-entry {
      page-break-inside: avoid;
      line-height: 1.5;
    }
  
    .compact-title {
      font-weight: 600;
      color: #1a1a1a;
      font-size: 10pt;
    }
  
    .compact-meta {
      color: #333333;
      font-weight: normal;
      font-size: 9.5pt;
    }
  
    .compact-desc {
      color: #4a4a4a;
      font-size: 9.5pt;
      margin: 3pt 0 0 0;
      line-height: 1.45;
    }
  
    /* ============ LANGUAGES ============ */
    .languages-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12pt;
      font-size: 10pt;
    }
  
    .language-entry {
      color: #1a1a1a;
    }
  
    .language-entry strong {
      font-weight: 600;
    }
  
    /* ============ PRINT STYLES ============ */
    @media print {
      @page {
        size: letter;
        margin: 0;
      }
  
      .resume-container {
        max-width: 100%;
        margin: 0;
      }
  
      .resume-page {
        padding: 0.6in 0.75in;
        box-shadow: none;
      }
  
      .section {
        page-break-inside: avoid;
      }
  
      .entry {
        page-break-inside: avoid;
      }
  
      .compact-entry {
        page-break-inside: avoid;
      }
  
      a {
        color: #000000 !important;
        text-decoration: none !important;
      }
    }
  
    /* ============ RESPONSIVE ============ */
    @media screen and (max-width: 768px) {
      .resume-page {
        padding: 20pt;
      }
  
      .name {
        font-size: 22pt;
      }
  
      .contact-bar {
        flex-direction: column;
        align-items: center;
        gap: 6pt;
      }
  
      .entry-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 2pt;
      }
  
      .separator {
        display: none;
      }
  
      .skill-row {
        flex-direction: column;
        gap: 3pt;
      }
  
      .skill-category {
        min-width: auto;
      }
    }
  </style>