<!-- src/routes/resumes/[id]/+page.svelte -->
<script>
    import Header from "$lib/components/Header.svelte";
import { onMount } from "svelte";
    export let data;
  
    const {
      basics,
      summary,
      work,
      education,
      skills,
      projects,
      certificates,
      languages,
      volunteers,
      awards,
      publications
    } = data;
  
    // Track active tab
    let activeTab = "Basics";
  
    const tabs = [
      "Basics",
      "Summary",
      "Work",
      "Education",
      "Skills",
      "Projects",
      "Certificates",
      "Languages",
      "Volunteers",
      "Awards",
      "Publications"
    ];
  
    function switchTab(tab) {
      activeTab = tab;
    }
  
    function addWork() {
      work.push({
        position: "",
        company_name: "",
        start_date: "",
        end_date: "",
        location: "",
        summary: [{ summary: "" }],
        highlights: []
      });
    }
  
    function addEducation() {
      education.push({
        institution: "",
        study_type: "",
        area: "",
        start_date: "",
        end_date: "",
        score: ""
      });
    }
  
    function addSkill() {
      skills.push({ name: "", keywords: [] });
    }
  </script>
  
  <!-- Tabs -->
  <div class="tabs">
    {#each tabs as tab}
      <button
        class="tab {activeTab === tab ? 'active' : ''}"
        on:click={() => switchTab(tab)}
      >
        {tab}
      </button>
    {/each}
  </div>
  <Header />
  <!-- Editable Sections -->
  <div class="tab-content">
    {#if activeTab === "Basics"}
      <h2>Basics</h2>
      <label>Name <input type="text" bind:value={basics.name} /></label>
      <label>Email <input type="email" bind:value={basics.email} /></label>
      <label>Phone <input type="text" bind:value={basics.phone} /></label>
      <label>City <input type="text" bind:value={basics.city} /></label>
      <label>URL <input type="url" bind:value={basics.url} /></label>
    {/if}
  
    {#if activeTab === "Summary"}
      <h2>Professional Summary</h2>
      <textarea rows="6" bind:value={summary.summary}></textarea>
    {/if}
  
    {#if activeTab === "Work"}
      <h2>Work Experience</h2>
      {#each work as job, i}
        <div class="work-item">
          <label>Position <input bind:value={job.position} /></label>
          <label>Company <input bind:value={job.company_name} /></label>
          <label>Start <input type="date" bind:value={job.start_date} /></label>
          <label>End <input type="date" bind:value={job.end_date} /></label>
          <label>Location <input bind:value={job.location} /></label>
          <label>Summary <textarea rows="3" bind:value={job.summary[0].summary}></textarea></label>
          <!-- <label>Highlights
            <textarea rows="2"
              bind:value={job.highlights[0]?.highlight}
              placeholder="Add highlights..."></textarea>
          </label> -->
        </div>
      {/each}
      <button on:click={addWork}>+ Add Work</button>
    {/if}
  
    {#if activeTab === "Education"}
      <h2>Education</h2>
      {#each education as edu}
        <div class="edu-item">
          <label>Institution <input bind:value={edu.institution} /></label>
          <label>Study Type <input bind:value={edu.study_type} /></label>
          <label>Area <input bind:value={edu.area} /></label>
          <label>Start <input type="date" bind:value={edu.start_date} /></label>
          <label>End <input type="date" bind:value={edu.end_date} /></label>
          <label>Score <input bind:value={edu.score} /></label>
        </div>
      {/each}
      <button on:click={addEducation}>+ Add Education</button>
    {/if}
  
    {#if activeTab === "Skills"}
      <h2>Skills</h2>
      {#each skills as skill}
        <div class="skill-item">
          <label>Category <input bind:value={skill.name} /></label>
          <label>Keywords <input bind:value={skill.keywords} placeholder="Comma separated" /></label>
        </div>
      {/each}
      <button on:click={addSkill}>+ Add Skill</button>
    {/if}
  
    <!-- Similar editable forms for Projects, Certificates, Languages, Volunteers, Awards, Publications -->
  </div>
  
  <style>
    .tabs {
      display: flex;
      gap: 0.5rem;
      border-bottom: 2px solid #ddd;
      margin-bottom: 1rem;
    }
    .tab {
      padding: 0.5rem 1rem;
      background: none;
      border: none;
      cursor: pointer;
    }
    .tab.active {
      border-bottom: 2px solid black;
      font-weight: bold;
    }
    .tab-content label {
      display: block;
      margin: 0.5rem 0;
    }
    input, textarea {
      display: block;
      width: 100%;
      padding: 0.4rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 0.2rem;
    }
    button {
      margin-top: 1rem;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f3f3f3;
      cursor: pointer;
    }
  </style>
  