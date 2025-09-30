<!-- src/routes/resumes/[id]/+page.svelte -->
<script>
    export let data;
    
    const { resume, profile, basics, summary, work, education, skills, projects, certificates, languages, volunteers, awards, publications } = data;
    
    // Helper function to format dates
    function formatDate(date) {
      if (!date) return 'Present';
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    
    // Calculate duration
    function calculateDuration(startDate, endDate) {
      if (!startDate) return '';
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date();
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      if (years > 0 && remainingMonths > 0) {
        return `${years}yr ${remainingMonths}mo`;
      } else if (years > 0) {
        return `${years}yr`;
      } else {
        return `${remainingMonths}mo`;
      }
    }
  </script>
  
  <svelte:head>
    <title>{basics?.name || 'Resume'} - Professional Resume</title>
  </svelte:head>
  
  <div class="resume-container">
    <div class="resume-page">
      
      <!-- Header Section -->
      <header class="header">
        <div class="header-content">
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
          <h2 class="section-title">Work Experience</h2>
          
          {#each work as job}
            <div class="experience-item">
              <div class="experience-header">
                <div>
                  <h3 class="job-title">{job.position}</h3>
                  <p class="company-name">{job.company_name}</p>
                </div>
                <div class="date-range">
                  <span>{formatDate(job.start_date)} - {formatDate(job.end_date)}</span>
                  <span class="duration">{calculateDuration(job.start_date, job.end_date)}</span>
                </div>
              </div>
              
              {#if job.summary && job.summary.length > 0}
                <p class="job-summary">{job.summary[0].summary}</p>
              {/if}
              
              {#if job.highlights && job.highlights.length > 0}
                <ul class="highlights-list">
                  {#each job.highlights as highlight}
                    <li>{highlight.highlight}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Volunteer Experience -->
      {#if volunteers && volunteers.length > 0}
        <section class="section">
          <h2 class="section-title">Volunteer Experience</h2>
          
          {#each volunteers as vol}
            <div class="experience-item">
              <div class="experience-header">
                <div>
                  <h3 class="job-title">{vol.position}</h3>
                  <p class="company-name">{vol.organization}</p>
                </div>
                <div class="date-range">
                  <span>{formatDate(vol.start_date)} - {formatDate(vol.end_date)}</span>
                  <span class="duration">{calculateDuration(vol.start_date, vol.end_date)}</span>
                </div>
              </div>
              
              {#if vol.summary && vol.summary.length > 0}
                <p class="job-summary">{vol.summary[0].summary}</p>
              {/if}
              
              {#if vol.highlights && vol.highlights.length > 0}
                <ul class="highlights-list">
                  {#each vol.highlights as highlight}
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
            <div class="education-item">
              <div class="education-header">
                <div>
                  <h3 class="degree">{edu.study_type} in {edu.area}</h3>
                  <p class="institution">{edu.institution}</p>
                </div>
                <div class="date-range">
                  {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                </div>
              </div>
              
              {#if edu.score}
                <p class="score">Score: {edu.score}</p>
              {/if}
              
              {#if edu.courses && edu.courses.length > 0}
                <div class="courses">
                  <strong>Relevant Coursework:</strong> {edu.courses.map(c => c.course).join(', ')}
                </div>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Skills -->
      {#if skills && skills.length > 0}
        <section class="section">
          <h2 class="section-title">Skills</h2>
          
          <div class="skills-grid">
            {#each skills as skill}
              <div class="skill-item">
                <span class="skill-name">{skill.name}</span>
                {#if skill.level}
                  <span class="skill-level">{skill.level}</span>
                {/if}
                {#if skill.keywords && skill.keywords.length > 0}
                  <div class="skill-keywords">
                    {#each skill.keywords as kw}
                      <span class="keyword-tag">{kw.keyword}</span>
                    {/each}
                  </div>
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
            <div class="project-item">
              <div class="project-header">
                <div>
                  <h3 class="project-name">{project.name}</h3>
                  {#if project.url}
                    <a href={project.url} target="_blank" rel="noopener noreferrer" class="project-link">
                      View Project →
                    </a>
                  {/if}
                </div>
                {#if project.start_date}
                  <div class="date-range">
                    {formatDate(project.start_date)} - {formatDate(project.end_date)}
                  </div>
                {/if}
              </div>
              
              {#if project.summary && project.summary.length > 0}
                <p class="project-summary">{project.summary[0].summary}</p>
              {/if}
              
              {#if project.highlights && project.highlights.length > 0}
                <ul class="highlights-list">
                  {#each project.highlights as highlight}
                    <li>{highlight.highlight}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </section>
      {/if}
  
      <!-- Certificates -->
      {#if certificates && certificates.length > 0}
        <section class="section">
          <h2 class="section-title">Certifications</h2>
          
          <div class="certificates-list">
            {#each certificates as cert}
              <div class="certificate-item">
                <div>
                  <strong>{cert.name}</strong>
                  <span class="cert-issuer">- {cert.issuer}</span>
                </div>
                <span class="cert-date">{formatDate(cert.date)}</span>
              </div>
            {/each}
          </div>
        </section>
      {/if}
  
      <!-- Awards -->
      {#if awards && awards.length > 0}
        <section class="section">
          <h2 class="section-title">Awards & Honors</h2>
          
          <div class="certificates-list">
            {#each awards as award}
              <div class="certificate-item">
                <div>
                  <strong>{award.title}</strong>
                  <span class="cert-issuer">- {award.awarder}</span>
                  {#if award.summary && award.summary.length > 0}
                    <p class="award-summary">{award.summary[0].summary}</p>
                  {/if}
                </div>
                <span class="cert-date">{formatDate(award.date)}</span>
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
            <div class="project-item">
              <div class="project-header">
                <div>
                  <h3 class="project-name">{pub.name}</h3>
                  <p class="company-name">{pub.publisher}</p>
                  {#if pub.url}
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" class="project-link">
                      View Publication →
                    </a>
                  {/if}
                </div>
                <div class="date-range">
                  {formatDate(pub.release_date)}
                </div>
              </div>
              
              {#if pub.summary && pub.summary.length > 0}
                <p class="project-summary">{pub.summary[0].summary}</p>
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
                {lang.language} <em>({lang.fluency})</em>
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f5f5f5;
    }
  
    .resume-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
  
    .resume-page {
      background: white;
      padding: 3rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
  
    /* Header */
    .header {
      border-bottom: 3px solid #2563eb;
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
    }
  
    .name {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 1rem 0;
    }
  
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      color: #64748b;
      font-size: 0.95rem;
    }
  
    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  
    .contact-item a {
      color: #2563eb;
      text-decoration: none;
    }
  
    .contact-item a:hover {
      text-decoration: underline;
    }
  
    .icon {
      width: 16px;
      height: 16px;
      stroke-width: 2;
    }
  
    /* Sections */
    .section {
      margin-bottom: 2rem;
    }
  
    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }
  
    .summary-text {
      color: #475569;
      line-height: 1.7;
      font-size: 1rem;
    }
  
    /* Experience Items */
    .experience-item,
    .education-item,
    .project-item {
      margin-bottom: 1.5rem;
    }
  
    .experience-header,
    .education-header,
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
  
    .job-title,
    .degree,
    .project-name {
      font-size: 1.15rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }
  
    .company-name,
    .institution {
      color: #64748b;
      font-size: 0.95rem;
      margin: 0;
    }
  
    .date-range {
      text-align: right;
      color: #64748b;
      font-size: 0.9rem;
      white-space: nowrap;
    }
  
    .duration {
      display: block;
      font-size: 0.85rem;
      color: #94a3b8;
    }
  
    .job-summary,
    .project-summary {
      color: #475569;
      line-height: 1.6;
      margin: 0.5rem 0;
    }
  
    .highlights-list {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      color: #475569;
      line-height: 1.7;
    }
  
    .highlights-list li {
      margin-bottom: 0.4rem;
    }
  
    /* Skills */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
  
    .skill-item {
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
  
    .skill-name {
      font-weight: 600;
      color: #1e293b;
      font-size: 0.95rem;
    }
  
    .skill-level {
      color: #2563eb;
      font-size: 0.85rem;
      margin-left: 0.5rem;
    }
  
    .skill-keywords {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.5rem;
    }
  
    .keyword-tag {
      background: #dbeafe;
      color: #1e40af;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }
  
    /* Education */
    .score {
      color: #2563eb;
      font-weight: 500;
      margin: 0.25rem 0;
    }
  
    .courses {
      color: #64748b;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
  
    /* Projects */
    .project-link {
      color: #2563eb;
      text-decoration: none;
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      margin-top: 0.25rem;
    }
  
    .project-link:hover {
      text-decoration: underline;
    }
  
    /* Certificates */
    .certificates-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  
    .certificate-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f8fafc;
      border-radius: 6px;
      border-left: 3px solid #2563eb;
    }
  
    .cert-issuer {
      color: #64748b;
      font-weight: normal;
    }
  
    .cert-date {
      color: #94a3b8;
      font-size: 0.9rem;
    }
  
    .award-summary {
      color: #64748b;
      font-size: 0.9rem;
      margin: 0.5rem 0 0 0;
      line-height: 1.6;
    }
  
    /* Languages */
    .languages-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  
    .language-item {
      color: #475569;
    }
  
    .language-item em {
      color: #94a3b8;
    }
  
    /* Resume Score */
    .resume-score {
      margin-top: 2rem;
      padding: 1rem;
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 6px;
      text-align: center;
      font-weight: 600;
      color: #166534;
    }
  
    /* Print Styles */
    @media print {
      .resume-container {
        margin: 0;
        padding: 0;
      }
  
      .resume-page {
        box-shadow: none;
        padding: 1.5rem;
      }
  
      .section {
        page-break-inside: avoid;
      }
    }
  
    /* Responsive */
    @media (max-width: 768px) {
      .resume-page {
        padding: 1.5rem;
      }
  
      .name {
        font-size: 2rem;
      }
  
      .contact-info {
        flex-direction: column;
        gap: 0.75rem;
      }
  
      .experience-header,
      .education-header,
      .project-header {
        flex-direction: column;
      }
  
      .date-range {
        text-align: left;
        margin-top: 0.25rem;
      }
  
      .skills-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>