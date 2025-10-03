<!-- src/routes/resumes/[id]/+page.svelte -->
<script>
    import { parse, format } from "date-fns";
    import { marked } from "marked";
  
    export let data;
    
    const { resume, profile, basics, summary, label, work, education, skills, projects, certificates, languages, volunteers, awards, publications } = data;
    
    // Helper function to format dates
    function formatDate(date) {
      if (!date) return 'Present';
      return date;
    }

    // Helper to sanitize and format markdown content
    function formatMarkdown(text) {
      if (!text) return '';
      return marked(text, { breaks: true, gfm: true });
    }

    // Calculate years of experience from work history
    function calculateExperience() {
      if (!work || work.length === 0) return null;
      // Simple calculation - can be enhanced based on needs
      const sortedWork = [...work].sort((a, b) => {
        const dateA = a.start_date ? new Date(a.start_date) : new Date();
        const dateB = b.start_date ? new Date(b.start_date) : new Date();
        return dateA - dateB;
      });
      return sortedWork.length > 0 ? sortedWork[0].start_date : null;
    }
  </script>
  
  <svelte:head>
    <title>{basics?.name || 'Resume'} - Professional Resume</title>
    <meta name="description" content="Professional resume for {basics?.name || 'candidate'}" />
  </svelte:head>
  
  <div class="resume-container">
    <div class="resume-page">
      
      <!-- Header Section -->
      <header class="header">
        <h3 class="name">{basics?.name || profile?.candidate_name || 'Candidate Name'}</h3>
        
        {#if label?.label}
          <div class="title-label">{@html marked(label.label)}</div>
        {/if}
        
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
          
          {#if basics?.city || basics?.region || basics?.country_code}
            <span class="contact-item">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {basics?.city || ''}{#if basics?.city && basics?.region}, {/if}{basics?.region || ''}{#if (basics?.city || basics?.region) && basics?.country_code}, {/if}{basics?.country_code || ''}
            </span>
          {/if}
          
          {#if basics?.url}
            <span class="contact-item">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
              <a href={basics.url} target="_blank" rel="noopener noreferrer" class="contact-link">
                {basics.url.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </span>
          {/if}

          {#if basics?.profiles && basics.profiles.length > 0}
            {#each basics.profiles as profile}
              <span class="contact-item">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                </svg>
                <a href={profile.url} target="_blank" rel="noopener noreferrer" class="contact-link">
                  {profile.network}
                </a>
              </span>
            {/each}
          {/if}
        </div>
      </header>
  
      <!-- Professional Summary -->
      {#if summary?.summary}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Professional Summary</span>
          </h2>
          <div class="summary-text">{ @html formatMarkdown(summary.summary) }</div>
        </section>
      {/if}
  
      <!-- Core Competencies / Key Skills (if you want a highlight section) -->
      {#if skills && skills.length > 0 && skills.some(s => s.level === 'expert' || s.level === 'advanced')}
        <section class="section core-competencies">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Core Competencies</span>
          </h2>
          <div class="competencies-grid">
            {#each skills.filter(s => s.level === 'expert' || s.level === 'advanced').slice(0, 6) as skill}
              <div class="competency-badge">{skill.name}</div>
            {/each}
          </div>
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
            <div class="entry work-entry">
              <div class="entry-header">
                <div class="entry-main">
                  <div class="entry-title-row">
                    <h3 class="entry-title">{job.position}</h3>
                    <span class="dates">{job.start_date} - {job.end_date || 'Present'}</span>
                  </div>
                  <div class="entry-meta">
                    <span class="company">{job.company_name}</span>
                    {#if job.location}
                      <span class="separator">•</span>
                      <span class="location">{job.location}</span>
                    {/if}
                  </div>
                </div>
              </div>
              
              {#if job.summary && job.summary.length > 0}
                <div class="entry-description">
                  {@html formatMarkdown(job.summary[0].summary)}
                </div>
              {/if}
              
              {#if job.highlights && job.highlights.length > 0}
                <ul class="entry-list">
                  {#each job.highlights as highlight}
                    <li>{@html formatMarkdown(highlight.highlight)}</li>
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
            <div class="entry education-entry">
              <div class="entry-header">
                <div class="entry-main">
                  <div class="entry-title-row">
                    <h3 class="entry-title">
                      {edu.study_type}{#if edu.area} in {edu.area}{/if}
                    </h3>
                    <span class="dates">{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</span>
                  </div>
                  <div class="entry-meta">
                    <span class="company">{edu.institution}</span>
                    {#if edu.location}
                      <span class="separator">•</span>
                      <span class="location">{edu.location}</span>
                    {/if}
                    {#if edu.score}
                      <span class="separator">•</span>
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

              {#if edu.honors && edu.honors.length > 0}
                <p class="coursework">
                  <strong>Honors:</strong> {edu.honors.join(', ')}
                </p>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Technical Skills -->
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
                    {skill.keywords.map(kw => typeof kw === 'string' ? kw : kw.keyword).join(' • ')}
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
            <div class="entry project-entry">
              <div class="entry-header">
                <div class="entry-main">
                  <div class="entry-title-row">
                    <h3 class="entry-title">{project.name}</h3>
                    {#if project.start_date}
                      <span class="dates">{formatDate(project.start_date)} - {formatDate(project.end_date)}</span>
                    {/if}
                  </div>
                  <div class="entry-meta">
                    {#if project.roles && project.roles.length > 0}
                      <span class="company">{project.roles.join(', ')}</span>
                      {#if project.url}
                        <span class="separator">•</span>
                      {/if}
                    {/if}
                    {#if project.url}
                      <a href={project.url} target="_blank" rel="noopener noreferrer" class="project-link">
                        View Project
                      </a>
                    {/if}
                  </div>
                </div>
              </div>
              
              {#if project.summary && project.summary.length > 0}
                <div class="entry-description">
                  {@html formatMarkdown(project.summary[0].summary)}
                </div>
              {/if}
              
              {#if project.highlights && project.highlights.length > 0}
                <ul class="entry-list">
                  {#each project.highlights as highlight}
                    <li>{@html formatMarkdown(typeof highlight === 'string' ? highlight : highlight.highlight)}</li>
                  {/each}
                </ul>
              {/if}

              {#if project.keywords && project.keywords.length > 0}
                <div class="tech-tags">
                  {#each project.keywords as keyword}
                    <span class="tech-tag">{typeof keyword === 'string' ? keyword : keyword.keyword}</span>
                  {/each}
                </div>
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
              <div class="compact-entry certification-entry">
                <div class="compact-row">
                  <strong class="compact-title">{cert.name}</strong>
                  <span class="compact-date">{formatDate(cert.date)}</span>
                </div>
                <div class="compact-meta">
                  {cert.issuer}
                  {#if cert.url}
                    <span class="separator">•</span>
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" class="cert-link">
                      View Credential
                    </a>
                  {/if}
                </div>
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
            <div class="entry publication-entry">
              <div class="entry-header">
                <div class="entry-main">
                  <div class="entry-title-row">
                    <h3 class="entry-title">{pub.name}</h3>
                    <span class="dates">{formatDate(pub.release_date)}</span>
                  </div>
                  <div class="entry-meta">
                    <span class="company">{pub.publisher}</span>
                    {#if pub.url}
                      <span class="separator">•</span>
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" class="project-link">
                        Read Publication
                      </a>
                    {/if}
                  </div>
                </div>
              </div>
              
              {#if pub.summary && pub.summary.length > 0}
                <div class="entry-description">
                  {@html formatMarkdown(pub.summary[0].summary)}
                </div>
              {/if}
            </div>
          {/each}
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
            <div class="entry volunteer-entry">
              <div class="entry-header">
                <div class="entry-main">
                  <div class="entry-title-row">
                    <h3 class="entry-title">{vol.position}</h3>
                    <span class="dates">{vol.start_date} - {vol.end_date || 'Present'}</span>
                  </div>
                  <div class="entry-meta">
                    <span class="company">{vol.organization}</span>
                    {#if vol.location}
                      <span class="separator">•</span>
                      <span class="location">{vol.location}</span>
                    {/if}
                  </div>
                </div>
              </div>
              
              {#if vol.summary && vol.summary.length > 0}
                <div class="entry-description">
                  {@html formatMarkdown(vol.summary[0].summary)}
                </div>
              {/if}
              
              {#if vol.highlights && vol.highlights.length > 0}
                <ul class="entry-list">
                  {#each vol.highlights as highlight}
                    <li>{@html formatMarkdown(typeof highlight === 'string' ? highlight : highlight.highlight)}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Awards & Honors -->
      {#if awards && awards.length > 0}
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon"></span>
            <span>Awards & Honors</span>
          </h2>
          
          <div class="compact-grid">
            {#each awards as award}
              <div class="compact-entry award-entry">
                <div class="compact-row">
                  <strong class="compact-title">{award.title}</strong>
                  <span class="compact-date">{formatDate(award.date)}</span>
                </div>
                <div class="compact-meta">{award.awarder}</div>
                {#if award.summary && award.summary.length > 0}
                  <p class="compact-desc">{award.summary[0].summary}</p>
                {/if}
              </div>
            {/each}
          </div>
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
              <div class="language-entry">
                <strong>{lang.language}</strong>
                <span class="language-level">({lang.fluency})</span>
              </div>
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
      font-family: 'Calibri', 'Helvetica Neue', 'Arial', sans-serif;
      background: #f5f5f5;
      color: #000000;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    :global(*) {
      box-sizing: border-box;
    }
  
    .resume-container {
      max-width: 8.5in;
      margin: 20px auto;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  
    .resume-page {
      background: #ffffff;
      padding: 0.65in 0.75in;
      min-height: 11in;
    }
  
    /* ============ HEADER ============ */
    .header {
      text-align: center;
      margin-bottom: 22pt;
      padding-bottom: 16pt;
      border-bottom: 2.5pt solid #000000;
    }
  
    .name {
      font-size: 24pt;
      font-weight: 700;
      color: #000000;
      margin: 0 0 6pt 0;
      letter-spacing: 1.2pt;
      text-transform: uppercase;
      line-height: 1.2;
    }

    .title-label {
      font-size: 11pt;
      color: #333333;
      font-weight: 600;
      margin: 0 0 12pt 0;
      letter-spacing: 0.5pt;
    }
  
    .contact-bar {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 6pt 18pt;
      font-size: 9.5pt;
      color: #333333;
      line-height: 1.4;
    }
  
    .contact-item {
      display: flex;
      align-items: center;
      gap: 5pt;
      white-space: nowrap;
    }
  
    .contact-link {
      color: #1a1a1a;
      text-decoration: none;
      transition: color 0.2s;
    }

    .contact-link:hover {
      color: #000000;
    }
  
    .icon {
      width: 12pt;
      height: 12pt;
      stroke-width: 2.5;
      flex-shrink: 0;
    }
  
    /* ============ SECTIONS ============ */
    .section {
      margin-bottom: 18pt;
      page-break-inside: avoid;
    }
  
    .section-title {
      font-size: 13pt;
      font-weight: 700;
      color: #000000;
      margin: 0 0 11pt 0;
      padding-bottom: 4pt;
      border-bottom: 2pt solid #000000;
      text-transform: uppercase;
      letter-spacing: 1pt;
      display: flex;
      align-items: center;
      gap: 9pt;
    }
  
    .title-icon {
      width: 4pt;
      height: 15pt;
      background: #000000;
      display: inline-block;
      flex-shrink: 0;
    }
  
    .summary-text {
      color: #1a1a1a;
      line-height: 1.6;
      font-size: 10pt;
      text-align: justify;
    }

    
    /* ============ CORE COMPETENCIES ============ */
    .core-competencies {
      background: #fafafa;
      padding: 12pt;
      border-radius: 4pt;
      margin-bottom: 20pt;
    }

    .competencies-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8pt;
    }

    .competency-badge {
      background: #ffffff;
      color: #1a1a1a;
      padding: 6pt 12pt;
      border-radius: 3pt;
      font-size: 9.5pt;
      font-weight: 600;
      border: 1pt solid #e0e0e0;
    }
  
    /* ============ ENTRIES (Work, Education, Projects) ============ */
    .entry {
      margin-bottom: 14pt;
      page-break-inside: avoid;
    }
  
    .entry-header {
      margin-bottom: 6pt;
    }
  
    .entry-main {
      display: flex;
      flex-direction: column;
      gap: 3pt;
    }

    .entry-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12pt;
      flex-wrap: wrap;
    }
  
    .entry-title {
      font-size: 11.5pt;
      font-weight: 700;
      color: #000000;
      margin: 0;
      line-height: 1.3;
      flex: 1;
    }
  
    .entry-meta {
      font-size: 10pt;
      color: #333333;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 7pt;
      line-height: 1.4;
    }
  
    .company {
      font-weight: 600;
      color: #1a1a1a;
    }

    .location {
      color: #4a4a4a;
      font-style: italic;
    }
  
    .dates {
      font-style: italic;
      color: #4a4a4a;
      font-weight: 500;
      white-space: nowrap;
    }
  
    .separator {
      color: #999999;
      font-weight: 400;
    }
  
    .gpa {
      font-weight: 600;
      color: #1a1a1a;
    }
  
    .entry-description {
      color: #1a1a1a;
      line-height: 1.55;
      font-size: 10pt;
      margin: 6pt 0;
      text-align: justify;
    }

    .entry-description :global(p) {
      margin: 0 0 6pt 0;
    }

    .entry-description :global(p:last-child) {
      margin: 0;
    }

    .entry-description :global(strong) {
      font-weight: 600;
      color: #000000;
    }
  
    .entry-list {
      margin: 6pt 0 0 18pt;
      padding: 0;
      color: #1a1a1a;
      line-height: 1.6;
      font-size: 10pt;
    }
  
    .entry-list li {
      margin-bottom: 4pt;
      padding-left: 5pt;
    }

    .entry-list li:last-child {
      margin-bottom: 0;
    }
  
    .entry-list li::marker {
      color: #333333;
      font-weight: 600;
    }

    .entry-list :global(strong) {
      font-weight: 600;
      color: #000000;
    }
  
    .project-link,
    .cert-link {
      color: #1a1a1a;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1pt solid #cccccc;
      transition: border-color 0.2s;
    }

    .project-link:hover,
    .cert-link:hover {
      border-bottom-color: #000000;
    }
  
    .coursework {
      color: #333333;
      font-size: 10pt;
      margin: 6pt 0 0 0;
      line-height: 1.5;
    }

    .coursework strong {
      color: #1a1a1a;
      font-weight: 600;
    }

    /* Tech Tags */
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5pt;
      margin-top: 8pt;
    }

    .tech-tag {
      background: #f0f0f0;
      color: #333333;
      padding: 3pt 8pt;
      border-radius: 2pt;
      font-size: 8.5pt;
      font-weight: 500;
    }
  
    /* ============ SKILLS ============ */
    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 7pt;
    }
  
    .skill-row {
      display: flex;
      gap: 10pt;
      font-size: 10pt;
      line-height: 1.5;
      align-items: baseline;
    }
  
    .skill-category {
      font-weight: 700;
      color: #000000;
      min-width: 130pt;
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
      gap: 10pt;
    }
  
    .compact-entry {
      page-break-inside: avoid;
      line-height: 1.5;
    }

    .compact-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12pt;
      flex-wrap: wrap;
    }
  
    .compact-title {
      font-weight: 600;
      color: #000000;
      font-size: 10.5pt;
    }

    .compact-date {
      color: #4a4a4a;
      font-style: italic;
      font-size: 9.5pt;
      white-space: nowrap;
    }
  
    .compact-meta {
      color: #333333;
      font-weight: normal;
      font-size: 10pt;
      margin-top: 2pt;
    }
  
    .compact-desc {
      color: #4a4a4a;
      font-size: 10pt;
      margin: 4pt 0 0 0;
      line-height: 1.5;
    }
  
    /* ============ LANGUAGES ============ */
    .languages-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16pt;
      font-size: 10pt;
    }
  
    .language-entry {
      color: #1a1a1a;
      display: flex;
      align-items: baseline;
      gap: 4pt;
    }
  
    .language-entry strong {
      font-weight: 600;
      color: #000000;
    }

    .language-level {
      color: #666666;
      font-size: 9.5pt;
    }
  
    /* ============ PRINT STYLES ============ */
    @media print {
      @page {
        size: letter;
        margin: 0;
      }

      :global(body) {
        background: #ffffff;
      }
  
      .resume-container {
        max-width: 100%;
        margin: 0;
        box-shadow: none;
      }
  
      .resume-page {
        padding: 0.65in 0.75in;
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

      .work-entry,
      .education-entry,
      .project-entry {
        page-break-inside: avoid;
      }

      /* Prevent orphaned headers */
      .section-title {
        page-break-after: avoid;
      }

      .entry-header {
        page-break-after: avoid;
      }
  
      a {
        color: #1a1a1a !important;
        text-decoration: none !important;
        border: none !important;
      }

      .contact-link,
      .project-link,
      .cert-link {
        border: none !important;
      }

      /* Ensure backgrounds print */
      .core-competencies {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .competency-badge,
      .tech-tag {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      /* Remove hover effects for print */
      .contact-link:hover,
      .project-link:hover,
      .cert-link:hover {
        color: #1a1a1a !important;
        border-color: transparent !important;
      }
    }
  
    /* ============ RESPONSIVE ============ */
    @media screen and (max-width: 768px) {
      .resume-container {
        margin: 0;
        box-shadow: none;
      }

      .resume-page {
        padding: 24pt 20pt;
      }
  
      .name {
        font-size: 24pt;
        letter-spacing: 0.8pt;
      }

      .title-label {
        font-size: 10pt;
      }
  
      .contact-bar {
        flex-direction: column;
        align-items: center;
        gap: 8pt;
      }

      .contact-item {
        width: 100%;
        justify-content: center;
      }

      .entry-title-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 4pt;
      }

      .dates {
        font-size: 9pt;
      }
  
      .entry-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 3pt;
      }
  
      .separator {
        display: none;
      }
  
      .skill-row {
        flex-direction: column;
        gap: 4pt;
      }
  
      .skill-category {
        min-width: auto;
      }

      .competencies-grid {
        gap: 6pt;
      }

      .competency-badge {
        font-size: 9pt;
        padding: 5pt 10pt;
      }

      .compact-row {
        flex-direction: column;
        gap: 2pt;
      }

      .section-title {
        font-size: 12pt;
      }

      .core-competencies {
        padding: 10pt;
      }
    }

    /* ============ ACCESSIBILITY ============ */
    @media (prefers-reduced-motion: reduce) {
      .contact-link,
      .project-link,
      .cert-link {
        transition: none;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .header {
        border-bottom-width: 3pt;
      }

      .section-title {
        border-bottom-width: 2.5pt;
      }

      .competency-badge {
        border-width: 2pt;
      }
    }

    /* ============ MARKDOWN CONTENT FORMATTING ============ */
    

    :global(.entry-description p:last-child),
    :global(.summary-text p:last-child) {
      margin: 0;
    }

    :global(.entry-description ul),
    :global(.summary-text ul) {
      margin: 6pt 0;
      padding-left: 20pt;
    }

    :global(.entry-description ol),
    :global(.summary-text ol) {
      margin: 6pt 0;
      padding-left: 20pt;
    }

    :global(.entry-description em),
    :global(.summary-text em) {
      font-style: italic;
      color: #333333;
    }

    :global(.entry-description code),
    :global(.summary-text code) {
      background: #f5f5f5;
      padding: 1pt 4pt;
      border-radius: 2pt;
      font-family: 'Courier New', monospace;
      font-size: 9pt;
    }

    :global(.entry-list strong) {
      font-weight: 600;
      color: #000000;
    }

    :global(.entry-list em) {
      font-style: italic;
    }

    /* ============ PDF OPTIMIZATION ============ */
    @media print {
      /* Optimize for PDF generation */
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* Ensure consistent spacing */
      .section {
        orphans: 2;
        widows: 2;
      }

      /* Prevent awkward page breaks */
      h1, h2, h3 {
        page-break-after: avoid;
      }

      .entry-title-row {
        page-break-after: avoid;
      }

      /* Keep list items together when possible */
      .entry-list li {
        page-break-inside: avoid;
      }

      /* Optimize for single-page if content fits */
      .resume-page {
        page-break-after: auto;
      }
    }

    /* ============ UTILITY CLASSES ============ */
    .text-muted {
      color: #666666;
    }

    .text-bold {
      font-weight: 600;
    }

    .no-break {
      page-break-inside: avoid;
    }
  </style>