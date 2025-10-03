<!-- src/routes/resumes/[id]/+page.svelte -->
<script>
  import { parse, format } from "date-fns";

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
      
      <div class="contact-info">
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
            <a href={basics.url} target="_blank" rel="noopener noreferrer">{basics.url}</a>
          </span>
        {/if}
      </div>
    </header>

    <!-- Professional Summary -->
    {#if summary}
      <section class="section">
        <h2 class="section-title">Professional Summary</h2>
        <p class="summary-text">{summary.summary}</p>
      </section>
    {/if}

    <!-- Work Experience -->
    {#if work && work.length > 0}
      <section class="section">
        <h2 class="section-title">Professional Experience</h2>
        
        {#each work as job}
          <div class="item">
            <div class="item-header">
              <div class="item-left">
                <h3 class="item-title">{job.position}</h3>
                <p class="item-subtitle">{job.company_name}</p>
              </div>
              <div class="item-right">
                {job.start_date} - {job.end_date}
              </div>
            </div>
            
            {#if job.summary && job.summary.length > 0}
              <p class="item-description">{job.summary[0].summary}</p>
            {/if}
            
            {#if job.highlights && job.highlights.length > 0}
              <ul class="item-list">
                {#each job.highlights as highlight}
                  <li>{highlight.highlight}</li>
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
        <h2 class="section-title">Education</h2>
        
        {#each education as edu}
          <div class="item">
            <div class="item-header">
              <div class="item-left">
                <h3 class="item-title">{edu.study_type} in {edu.area}</h3>
                <p class="item-subtitle">{edu.institution}</p>
              </div>
              <div class="item-right">
                {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
              </div>
            </div>
            
            {#if edu.score}
              <p class="score">GPA: {edu.score}</p>
            {/if}
            
            {#if edu.courses && edu.courses.length > 0}
              <p class="courses">
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
        <h2 class="section-title">Skills</h2>
        
        <div class="skills-container">
          {#each skills as skill}
            <div class="skill-group">
              <strong class="skill-name">{skill.name}</strong>
              {#if skill.keywords && skill.keywords.length > 0}
                <span class="skill-keywords">
                  {skill.keywords.map(kw => kw.keyword).join(' • ')}
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
        <h2 class="section-title">Projects</h2>
        
        {#each projects as project}
          <div class="item">
            <div class="item-header">
              <div class="item-left">
                <h3 class="item-title">{project.name}</h3>
                {#if project.url}
                  <a href={project.url} target="_blank" rel="noopener noreferrer" class="item-link">
                    {project.url}
                  </a>
                {/if}
              </div>
              {#if project.start_date}
                <div class="item-right">
                  {formatDate(project.start_date)} - {formatDate(project.end_date)}
                </div>
              {/if}
            </div>
            
            {#if project.summary && project.summary.length > 0}
              <p class="item-description">{project.summary[0].summary}</p>
            {/if}
            
            {#if project.highlights && project.highlights.length > 0}
              <ul class="item-list">
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
        <h2 class="section-title">Certifications</h2>
        
        <div class="compact-list">
          {#each certificates as cert}
            <div class="compact-item">
              <div class="compact-left">
                <strong>{cert.name}</strong>
                <span class="compact-subtitle"> - {cert.issuer}</span>
              </div>
              <span class="compact-right">{formatDate(cert.date)}</span>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Volunteer Experience -->
    {#if volunteers && volunteers.length > 0}
      <section class="section">
        <h2 class="section-title">Volunteer Experience</h2>
        
        {#each volunteers as vol}
          <div class="item">
            <div class="item-header">
              <div class="item-left">
                <h3 class="item-title">{vol.position}</h3>
                <p class="item-subtitle">{vol.organization}</p>
              </div>
              <div class="item-right">
                {vol.start_date} - {vol.end_date}
              </div>
            </div>
            
            {#if vol.summary && vol.summary.length > 0}
              <p class="item-description">{vol.summary[0].summary}</p>
            {/if}
            
            {#if vol.highlights && vol.highlights.length > 0}
              <ul class="item-list">
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
        <h2 class="section-title">Awards & Honors</h2>
        
        <div class="compact-list">
          {#each awards as award}
            <div class="compact-item">
              <div class="compact-left">
                <strong>{award.title}</strong>
                <span class="compact-subtitle"> - {award.awarder}</span>
                {#if award.summary && award.summary.length > 0}
                  <p class="compact-description">{award.summary[0].summary}</p>
                {/if}
              </div>
              <span class="compact-right">{formatDate(award.date)}</span>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Publications -->
    {#if publications && publications.length > 0}
      <section class="section">
        <h2 class="section-title">Publications</h2>
        
        {#each publications as pub}
          <div class="item">
            <div class="item-header">
              <div class="item-left">
                <h3 class="item-title">{pub.name}</h3>
                <p class="item-subtitle">{pub.publisher}</p>
                {#if pub.url}
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" class="item-link">
                    {pub.url}
                  </a>
                {/if}
              </div>
              <div class="item-right">
                {formatDate(pub.release_date)}
              </div>
            </div>
            
            {#if pub.summary && pub.summary.length > 0}
              <p class="item-description">{pub.summary[0].summary}</p>
            {/if}
          </div>
        {/each}
      </section>
    {/if}

    <!-- Languages -->
    {#if languages && languages.length > 0}
      <section class="section">
        <h2 class="section-title">Languages</h2>
        
        <div class="languages-list">
          {#each languages as lang}
            <span class="language-item">
              <strong>{lang.language}</strong>: {lang.fluency}
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
    font-family: 'Georgia', 'Times New Roman', serif;
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
    padding: 0.75in;
    min-height: 11in;
  }

  /* Header */
  .header {
    border-bottom: 2px solid #000000;
    padding-bottom: 12pt;
    margin-bottom: 18pt;
  }

  .name {
    font-size: 24pt;
    font-weight: 700;
    color: #000000;
    margin: 0 0 8pt 0;
    letter-spacing: 0.5pt;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 12pt;
    font-size: 10pt;
    color: #333333;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 4pt;
  }

  .contact-item a {
    color: #000000;
    text-decoration: none;
  }

  .icon {
    width: 12pt;
    height: 12pt;
    stroke-width: 2;
  }

  /* Sections */
  .section {
    margin-bottom: 16pt;
    page-break-inside: avoid;
  }

  .section-title {
    font-size: 13pt;
    font-weight: 700;
    color: #000000;
    margin: 0 0 10pt 0;
    padding-bottom: 4pt;
    border-bottom: 1.5pt solid #000000;
    text-transform: uppercase;
    letter-spacing: 1pt;
  }

  .summary-text {
    color: #000000;
    line-height: 1.5;
    font-size: 10.5pt;
    margin: 0;
  }

  /* Items (Work, Education, Projects) */
  .item {
    margin-bottom: 14pt;
    page-break-inside: avoid;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6pt;
  }

  .item-left {
    flex: 1;
  }

  .item-right {
    text-align: right;
    color: #333333;
    font-size: 10pt;
    font-style: italic;
    white-space: nowrap;
    margin-left: 12pt;
  }

  .item-title {
    font-size: 11.5pt;
    font-weight: 700;
    color: #000000;
    margin: 0 0 2pt 0;
  }

  .item-subtitle {
    color: #333333;
    font-size: 10.5pt;
    font-style: italic;
    margin: 0;
  }

  .item-link {
    color: #000000;
    font-size: 9.5pt;
    text-decoration: none;
    display: block;
    margin-top: 2pt;
  }

  .item-description {
    color: #000000;
    line-height: 1.5;
    font-size: 10pt;
    margin: 6pt 0;
  }

  .item-list {
    margin: 6pt 0 0 18pt;
    padding: 0;
    color: #000000;
    line-height: 1.5;
    font-size: 10pt;
  }

  .item-list li {
    margin-bottom: 4pt;
  }

  /* Skills */
  .skills-container {
    display: flex;
    flex-direction: column;
    gap: 8pt;
  }

  .skill-group {
    display: flex;
    flex-direction: column;
    gap: 3pt;
  }

  .skill-name {
    font-weight: 700;
    color: #000000;
    font-size: 10.5pt;
  }

  .skill-keywords {
    color: #333333;
    font-size: 10pt;
    line-height: 1.4;
  }

  /* Compact Items (Certifications, Awards) */
  .compact-list {
    display: flex;
    flex-direction: column;
    gap: 8pt;
  }

  .compact-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    page-break-inside: avoid;
  }

  .compact-left {
    flex: 1;
  }

  .compact-subtitle {
    color: #333333;
    font-weight: normal;
  }

  .compact-right {
    color: #333333;
    font-size: 10pt;
    font-style: italic;
    white-space: nowrap;
    margin-left: 12pt;
  }

  .compact-description {
    color: #333333;
    font-size: 9.5pt;
    margin: 4pt 0 0 0;
    line-height: 1.4;
  }

  /* Education specific */
  .score {
    color: #000000;
    font-weight: 600;
    margin: 4pt 0;
    font-size: 10pt;
  }

  .courses {
    color: #333333;
    font-size: 10pt;
    margin: 4pt 0 0 0;
    line-height: 1.4;
  }

  /* Languages */
  .languages-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12pt;
    font-size: 10pt;
  }

  .language-item {
    color: #000000;
  }

  /* Print Styles */
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
      padding: 0.75in;
      box-shadow: none;
    }

    .section {
      page-break-inside: avoid;
    }

    .item {
      page-break-inside: avoid;
    }

    .compact-item {
      page-break-inside: avoid;
    }

    .item-list {
      page-break-inside: avoid;
    }

    a {
      color: #000000 !important;
      text-decoration: none !important;
    }
  }

  /* Screen responsiveness */
  @media screen and (max-width: 768px) {
    .resume-page {
      padding: 24pt;
    }

    .name {
      font-size: 20pt;
    }

    .contact-info {
      flex-direction: column;
      gap: 8pt;
    }

    .item-header {
      flex-direction: column;
    }

    .item-right {
      text-align: left;
      margin-left: 0;
      margin-top: 4pt;
    }

    .compact-item {
      flex-direction: column;
      gap: 4pt;
    }

    .compact-right {
      margin-left: 0;
    }
  }
</style>