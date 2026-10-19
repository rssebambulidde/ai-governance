/**
 * AI Impact Assessment Studio — Client-Side Application Engine
 * Aligned with NIST AI RMF 1.0 (GOVERN 4.2 · MAP 3.1 · MAP 5.1 · MANAGE 1.1)
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const stepperMenu = document.getElementById('stepper-menu');
  const sections = document.querySelectorAll('.form-section');
  const stepItems = document.querySelectorAll('.step-item');
  const progressBar = document.getElementById('progress-bar');
  const progressIndicator = document.getElementById('progress-indicator');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const toast = document.getElementById('toast');

  // Header badges
  const badgeSystemId = document.getElementById('badge-system-id');
  const badgeSystemName = document.getElementById('badge-system-name');
  const badgeRecStatus = document.getElementById('badge-rec-status');

  // Action Buttons
  const btnLoadPreset = document.getElementById('btn-load-preset');
  const btnBlankForm = document.getElementById('btn-blank-form');
  const btnExportJson = document.getElementById('btn-export-json');
  const btnImportJsonTrigger = document.getElementById('btn-import-json-trigger');
  const jsonFileInput = document.getElementById('json-file-input');
  const btnExportMd = document.getElementById('btn-export-md');
  const btnExportMdBottom = document.getElementById('btn-export-md-bottom');
  const btnPrintPdf = document.getElementById('btn-print-pdf');
  const btnPrintPdfBottom = document.getElementById('btn-print-pdf-bottom');

  // Table add buttons
  document.getElementById('btn-add-user-row')?.addEventListener('click', () => addUserRow());
  document.getElementById('btn-add-reg-row')?.addEventListener('click', () => addRegulationRow());
  document.getElementById('btn-add-benefit-row')?.addEventListener('click', () => addBenefitRow());
  document.getElementById('btn-add-harm-row')?.addEventListener('click', () => addHarmRow());
  document.getElementById('btn-add-mitigation-row')?.addEventListener('click', () => addMitigationRow());
  document.getElementById('btn-add-accepted-row')?.addEventListener('click', () => addAcceptedRiskRow());
  document.getElementById('btn-add-stakeholder-row')?.addEventListener('click', () => addStakeholderRow());
  document.getElementById('btn-add-tevv-row')?.addEventListener('click', () => addTevvActivityRow());
  document.getElementById('btn-add-metric-row')?.addEventListener('click', () => addMetricRow());

  // 1. Navigation & Tab Switching
  stepItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  function switchTab(tabId) {
    stepItems.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === `sec-${tabId}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateProgress();
  }

  function updateProgress() {
    const activeBtn = document.querySelector('.step-item.active');
    if (!activeBtn) return;
    const allBtns = Array.from(stepItems);
    const currentIndex = allBtns.indexOf(activeBtn);
    const pct = Math.round(((currentIndex + 1) / allBtns.length) * 100);
    progressBar.style.width = `${pct}%`;
    progressIndicator.textContent = `Step ${currentIndex + 1} of ${allBtns.length} (${pct}%)`;
  }

  // 2. Theme Toggle
  function initTheme() {
    const savedTheme = localStorage.getItem('aiia_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  initTheme();

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('aiia_theme', newTheme);
  });

  // 3. Toast Notifications
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // 4. Header Badges Sync
  function syncHeaderBadges() {
    const sysId = document.getElementById('f-system-id').value || 'SYS-001';
    const sysName = document.getElementById('f-system-name').value || 'AI System';
    badgeSystemId.textContent = sysId;
    badgeSystemName.textContent = sysName;

    const selectedRec = document.querySelector('input[name="rec-decision"]:checked')?.value || 'GO';
    badgeRecStatus.textContent = selectedRec;
    badgeRecStatus.className = 'badge-recommendation';
    if (selectedRec === 'GO') badgeRecStatus.classList.add('go');
    else if (selectedRec === 'CONDITIONAL GO') badgeRecStatus.classList.add('cond');
    else badgeRecStatus.classList.add('nogo');
  }

  document.getElementById('f-system-id').addEventListener('input', syncHeaderBadges);
  document.getElementById('f-system-name').addEventListener('input', syncHeaderBadges);
  document.querySelectorAll('input[name="rec-decision"]').forEach(radio => {
    radio.addEventListener('change', syncHeaderBadges);
  });

  // 5. Dynamic Table Row Generators

  // Users Table
  function addUserRow(data = {}) {
    const tbody = document.querySelector('#table-users tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-input u-group" value="${data.group || ''}" placeholder="e.g. Retail Customers"></td>
      <td><input type="text" class="form-input u-role" value="${data.role || ''}" placeholder="e.g. End User / Subject"></td>
      <td><input type="text" class="form-input u-count" value="${data.count || ''}" placeholder="e.g. ~10,000"></td>
      <td>
        <select class="form-select u-lit">
          <option value="High" ${data.literacy === 'High' ? 'selected' : ''}>High</option>
          <option value="Medium" ${data.literacy === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="Low" ${data.literacy === 'Low' ? 'selected' : ''}>Low</option>
        </select>
      </td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;
    tr.querySelector('.btn-del-row').addEventListener('click', () => tr.remove());
    tbody.appendChild(tr);
  }

  // Societal Values Table
  function renderValuesTable(values = []) {
    const tbody = document.querySelector('#table-values tbody');
    tbody.innerHTML = '';
    const defaultValues = values.length ? values : [
      { name: "Fairness & non-discrimination", status: "Yes", notes: "" },
      { name: "Privacy and data protection", status: "Yes", notes: "" },
      { name: "Human dignity and autonomy", status: "Yes", notes: "" },
      { name: "Transparency and accountability", status: "Yes", notes: "" },
      { name: "Environmental sustainability", status: "Yes", notes: "" }
    ];

    defaultValues.forEach(val => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600; min-width: 180px;">${val.name}</td>
        <td style="width: 140px;">
          <select class="form-select v-status">
            <option value="Yes" ${val.status === 'Yes' ? 'selected' : ''}>Yes</option>
            <option value="No" ${val.status === 'No' ? 'selected' : ''}>No</option>
            <option value="Uncertain" ${val.status === 'Uncertain' ? 'selected' : ''}>Uncertain</option>
          </select>
        </td>
        <td><input type="text" class="form-input v-notes" value="${val.notes || ''}" placeholder="Operational controls & justification"></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Regulations Table
  function addRegulationRow(data = {}) {
    const tbody = document.querySelector('#table-regulations tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-input r-area" value="${data.area || ''}" placeholder="Requirement area"></td>
      <td style="width: 100px;">
        <select class="form-select r-app">
          <option value="Yes" ${data.applicable === 'Yes' ? 'selected' : ''}>Yes</option>
          <option value="No" ${data.applicable === 'No' ? 'selected' : ''}>No</option>
        </select>
      </td>
      <td><input type="text" class="form-input r-law" value="${data.law || ''}" placeholder="Law / standard name"></td>
      <td style="width: 160px;">
        <select class="form-select r-stat">
          <option value="Compliant" ${data.status === 'Compliant' ? 'selected' : ''}>Compliant</option>
          <option value="Under Review" ${data.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
          <option value="Gap Identified" ${data.status === 'Gap Identified' ? 'selected' : ''}>Gap Identified</option>
        </select>
      </td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;
    tr.querySelector('.btn-del-row').addEventListener('click', () => tr.remove());
    tbody.appendChild(tr);
  }

  // Benefits Table
  function addBenefitRow(data = {}) {
    const tbody = document.querySelector('#table-benefits tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-input b-benefit" value="${data.benefit || ''}" placeholder="Intended benefit"></td>
      <td><input type="text" class="form-input b-bene" value="${data.beneficiary || ''}" placeholder="Beneficiary group"></td>
      <td><input type="text" class="form-input b-metric" value="${data.howMeasured || ''}" placeholder="Measurement metric"></td>
      <td style="width: 130px;">
        <select class="form-select b-conf">
          <option value="High" ${data.confidence === 'High' ? 'selected' : ''}>High</option>
          <option value="Medium" ${data.confidence === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="Low" ${data.confidence === 'Low' ? 'selected' : ''}>Low</option>
        </select>
      </td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;
    tr.querySelector('.btn-del-row').addEventListener('click', () => tr.remove());
    tbody.appendChild(tr);
  }

  // Harms & Risk Calculator Table
  function addHarmRow(data = {}) {
    const tbody = document.querySelector('#table-harms tbody');
    const tr = document.createElement('tr');
    const harmId = data.id || `H-${String(tbody.children.length + 1).padStart(2, '0')}`;
    const lVal = parseInt(data.likelihood, 10) || 2;
    const iVal = parseInt(data.impact, 10) || 3;
    const score = lVal * iVal;

    tr.innerHTML = `
      <td style="width: 75px;"><input type="text" class="form-input h-id" value="${harmId}"></td>
      <td>
        <input type="text" class="form-input h-desc" value="${data.description || ''}" placeholder="Harm description & mechanism">
      </td>
      <td>
        <input type="text" class="form-input h-who" value="${data.who || ''}" placeholder="Affected populations / assets">
      </td>
      <td style="width: 160px;">
        <select class="form-select h-dim">
          <option value="Reliability" ${data.dimension === 'Reliability' ? 'selected' : ''}>Reliability</option>
          <option value="Fairness & Bias" ${data.dimension === 'Fairness & Bias' ? 'selected' : ''}>Fairness & Bias</option>
          <option value="Security & Resilience" ${data.dimension === 'Security & Resilience' ? 'selected' : ''}>Security & Resilience</option>
          <option value="Privacy" ${data.dimension === 'Privacy' ? 'selected' : ''}>Privacy</option>
          <option value="Safety" ${data.dimension === 'Safety' ? 'selected' : ''}>Safety</option>
          <option value="Transparency & Explainability" ${data.dimension === 'Transparency & Explainability' ? 'selected' : ''}>Transparency</option>
          <option value="Societal & Environmental" ${data.dimension === 'Societal & Environmental' ? 'selected' : ''}>Societal</option>
        </select>
      </td>
      <td style="width: 90px;">
        <select class="form-select h-l">
          <option value="1" ${lVal === 1 ? 'selected' : ''}>1 - Rare</option>
          <option value="2" ${lVal === 2 ? 'selected' : ''}>2 - Unlikely</option>
          <option value="3" ${lVal === 3 ? 'selected' : ''}>3 - Possible</option>
          <option value="4" ${lVal === 4 ? 'selected' : ''}>4 - Likely</option>
          <option value="5" ${lVal === 5 ? 'selected' : ''}>5 - Almost Certain</option>
        </select>
      </td>
      <td style="width: 90px;">
        <select class="form-select h-i">
          <option value="1" ${iVal === 1 ? 'selected' : ''}>1 - Negligible</option>
          <option value="2" ${iVal === 2 ? 'selected' : ''}>2 - Minor</option>
          <option value="3" ${iVal === 3 ? 'selected' : ''}>3 - Moderate</option>
          <option value="4" ${iVal === 4 ? 'selected' : ''}>4 - Major</option>
          <option value="5" ${iVal === 5 ? 'selected' : ''}>5 - Catastrophic</option>
        </select>
      </td>
      <td class="score-cell h-score">${score}</td>
      <td style="width: 100px;"><span class="badge-risk ${getRiskClass(score)} h-badge">${getRiskLevelText(score)}</span></td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;

    const lSelect = tr.querySelector('.h-l');
    const iSelect = tr.querySelector('.h-i');
    const scoreCell = tr.querySelector('.h-score');
    const badgeSpan = tr.querySelector('.h-badge');

    function recalc() {
      const l = parseInt(lSelect.value, 10);
      const i = parseInt(iSelect.value, 10);
      const s = l * i;
      scoreCell.textContent = s;
      badgeSpan.className = `badge-risk ${getRiskClass(s)} h-badge`;
      badgeSpan.textContent = getRiskLevelText(s);
      recalculateRiskScorecard();
    }

    lSelect.addEventListener('change', recalc);
    iSelect.addEventListener('change', recalc);
    tr.querySelector('.btn-del-row').addEventListener('click', () => {
      tr.remove();
      recalculateRiskScorecard();
    });

    tbody.appendChild(tr);
    recalculateRiskScorecard();
  }

  function getRiskClass(score) {
    if (score >= 20) return 'crit';
    if (score >= 13) return 'high';
    if (score >= 7) return 'med';
    return 'low';
  }

  function getRiskLevelText(score) {
    if (score >= 20) return 'Critical';
    if (score >= 13) return 'High';
    if (score >= 7) return 'Medium';
    return 'Low';
  }

  function recalculateRiskScorecard() {
    let crit = 0, high = 0, med = 0, low = 0;
    document.querySelectorAll('#table-harms tbody tr').forEach(tr => {
      const s = parseInt(tr.querySelector('.h-score')?.textContent, 10) || 0;
      if (s >= 20) crit++;
      else if (s >= 13) high++;
      else if (s >= 7) med++;
      else low++;
    });

    document.getElementById('count-crit').textContent = crit;
    document.getElementById('count-high').textContent = high;
    document.getElementById('count-med').textContent = med;
    document.getElementById('count-low').textContent = low;
  }

  // Mitigations Table
  function addMitigationRow(data = {}) {
    const tbody = document.querySelector('#table-mitigations tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="width: 90px;"><input type="text" class="form-input m-harm-id" value="${data.harmId || ''}" placeholder="H-01"></td>
      <td style="width: 120px;">
        <select class="form-select m-type">
          <option value="Mitigate" ${data.responseType === 'Mitigate' ? 'selected' : ''}>Mitigate</option>
          <option value="Transfer" ${data.responseType === 'Transfer' ? 'selected' : ''}>Transfer</option>
          <option value="Avoid" ${data.responseType === 'Avoid' ? 'selected' : ''}>Avoid</option>
          <option value="Accept" ${data.responseType === 'Accept' ? 'selected' : ''}>Accept</option>
        </select>
      </td>
      <td><input type="text" class="form-input m-action" value="${data.action || ''}" placeholder="Concrete technical / procedural control"></td>
      <td style="width: 140px;"><input type="text" class="form-input m-owner" value="${data.owner || ''}" placeholder="Owner Role"></td>
      <td style="width: 120px;"><input type="date" class="form-input m-date" value="${data.targetDate || ''}"></td>
      <td style="width: 110px;">
        <select class="form-select m-residual">
          <option value="Low" ${data.residual === 'Low' ? 'selected' : ''}>Low</option>
          <option value="Medium" ${data.residual === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="High" ${data.residual === 'High' ? 'selected' : ''}>High</option>
        </select>
      </td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;
    tr.querySelector('.btn-del-row').addEventListener('click', () => tr.remove());
    tbody.appendChild(tr);
  }

  // Accepted Risks Table
  function addAcceptedRiskRow(data = {}) {
    const tbody = document.querySelector('#table-accepted-risks tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="width: 90px;"><input type="text" class="form-input acc-id" value="${data.harmId || ''}" placeholder="H-03"></td>
      <td style="width: 110px;">
        <select class="form-select acc-level">
          <option value="Low" ${data.residualLevel === 'Low' ? 'selected' : ''}>Low</option>
          <option value="Medium" ${data.residualLevel === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="High" ${data.residualLevel === 'High' ? 'selected' : ''}>High</option>
        </select>
      </td>
      <td><input type="text" class="form-input acc-rat" value="${data.rationale || ''}" placeholder="Justification for residual risk acceptance"></td>
      <td style="width: 150px;"><input type="text" class="form-input acc-by" value="${data.acceptedBy || ''}" placeholder="Approver Role"></td>
      <td style="width: 120px;"><input type="date" class="form-input acc-date" value="${data.date || ''}"></td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;
    tr.querySelector('.btn-del-row').addEventListener('click', () => tr.remove());
    tbody.appendChild(tr);
  }

  // Stakeholders Table
  function addStakeholderRow(data = {}) {
    const tbody = document.querySelector('#table-stakeholders tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-input s-group" value="${data.group || ''}" placeholder="Stakeholder group"></td>
      <td style="width: 150px;">
        <select class="form-select s-type">
          <option value="Internal operator" ${data.type === 'Internal operator' ? 'selected' : ''}>Internal operator</option>
          <option value="External affected community" ${data.type === 'External affected community' ? 'selected' : ''}>External affected</option>
          <option value="Marginalized group" ${data.type === 'Marginalized group' ? 'selected' : ''}>Marginalized group</option>
          <option value="Internal oversight" ${data.type === 'Internal oversight' ? 'selected' : ''}>Internal oversight</option>
          <option value="External domain expert" ${data.type === 'External domain expert' ? 'selected' : ''}>External expert</option>
        </select>
      </td>
      <td><input type="text" class="form-input s-method" value="${data.method || ''}" placeholder="e.g. Workshop / Survey"></td>
      <td style="width: 120px;"><input type="date" class="form-input s-date" value="${data.date || ''}"></td>
      <td><input type="text" class="form-input s-feedback" value="${data.feedback || ''}" placeholder="Summary of key feedback"></td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;
    tr.querySelector('.btn-del-row').addEventListener('click', () => tr.remove());
    tbody.appendChild(tr);
  }

  // Engagement Quality Checks Table
  function renderEngagementChecksTable(checks = []) {
    const tbody = document.querySelector('#table-engagement-checks tbody');
    tbody.innerHTML = '';
    const defaultChecks = checks.length ? checks : [
      { criterion: "Historically excluded populations included", met: "Yes", notes: "" },
      { criterion: "Persons with disabilities consulted", met: "Yes", notes: "" },
      { criterion: "Engagement was meaningful (not participation washing)", met: "Yes", notes: "" },
      { criterion: "Feedback was documented and addressed", met: "Yes", notes: "" },
      { criterion: "Feedback influenced design or risk controls", met: "Yes", notes: "" }
    ];

    defaultChecks.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600; min-width: 200px;">${item.criterion}</td>
        <td style="width: 120px;">
          <select class="form-select eq-met">
            <option value="Yes" ${item.met === 'Yes' ? 'selected' : ''}>Yes</option>
            <option value="No" ${item.met === 'No' ? 'selected' : ''}>No</option>
          </select>
        </td>
        <td><input type="text" class="form-input eq-notes" value="${item.notes || ''}" placeholder="Evidence and documentation reference"></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // TEVV Activities Table
  function addTevvActivityRow(data = {}) {
    const tbody = document.querySelector('#table-tevv-activities tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-input t-act" value="${data.activity || ''}" placeholder="TEVV activity description"></td>
      <td style="width: 110px;">
        <select class="form-select t-comp">
          <option value="Yes" ${data.completed === 'Yes' ? 'selected' : ''}>Yes</option>
          <option value="No" ${data.completed === 'No' ? 'selected' : ''}>No</option>
        </select>
      </td>
      <td style="width: 120px;"><input type="date" class="form-input t-date" value="${data.date || ''}"></td>
      <td style="width: 160px;"><input type="text" class="form-input t-by" value="${data.conductedBy || ''}" placeholder="Conducted By"></td>
      <td><input type="text" class="form-input t-findings" value="${data.findings || ''}" placeholder="Key findings & observations"></td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;
    tr.querySelector('.btn-del-row').addEventListener('click', () => tr.remove());
    tbody.appendChild(tr);
  }

  // Performance Metrics Table
  function addMetricRow(data = {}) {
    const tbody = document.querySelector('#table-metrics tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-input met-name" value="${data.metric || ''}" placeholder="Metric name"></td>
      <td style="width: 140px;"><input type="text" class="form-input met-thresh" value="${data.threshold || ''}" placeholder="Threshold (e.g. ≥ 99%)"></td>
      <td style="width: 140px;"><input type="text" class="form-input met-actual" value="${data.actual || ''}" placeholder="Actual Result"></td>
      <td style="width: 110px;">
        <select class="form-select met-res">
          <option value="Pass" ${data.result === 'Pass' ? 'selected' : ''}>Pass</option>
          <option value="Fail" ${data.result === 'Fail' ? 'selected' : ''}>Fail</option>
        </select>
      </td>
      <td class="col-act"><button type="button" class="btn-del-row" title="Delete Row">✕</button></td>
    `;
    tr.querySelector('.btn-del-row').addEventListener('click', () => tr.remove());
    tbody.appendChild(tr);
  }

  // Approvals Sign-off Table
  function renderApprovalsTable(approvals = []) {
    const tbody = document.querySelector('#table-approvals tbody');
    tbody.innerHTML = '';
    const defaultApprovals = approvals.length ? approvals : [
      { role: "AI Ethics Officer", name: "", decision: "Approved", notes: "", date: "", signature: "" },
      { role: "AI Risk Officer", name: "", decision: "Approved", notes: "", date: "", signature: "" },
      { role: "AI Project Lead", name: "", decision: "Acknowledged", notes: "", date: "", signature: "" },
      { role: "Legal & Compliance", name: "", decision: "Cleared", notes: "", date: "", signature: "" },
      { role: "Approving Executive", name: "", decision: "Approved", notes: "", date: "", signature: "" }
    ];

    defaultApprovals.forEach(app => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; width: 160px;">${app.role}</td>
        <td><input type="text" class="form-input app-name" value="${app.name || ''}" placeholder="Signatory Full Name"></td>
        <td style="width: 140px;">
          <select class="form-select app-dec">
            <option value="Approved" ${app.decision === 'Approved' ? 'selected' : ''}>✅ Approved</option>
            <option value="Cleared" ${app.decision === 'Cleared' ? 'selected' : ''}>✅ Cleared</option>
            <option value="Acknowledged" ${app.decision === 'Acknowledged' ? 'selected' : ''}>ℹ️ Acknowledged</option>
            <option value="Conditional" ${app.decision === 'Conditional' ? 'selected' : ''}>⚠️ Conditional</option>
            <option value="Rejected" ${app.decision === 'Rejected' ? 'selected' : ''}>❌ Rejected</option>
          </select>
        </td>
        <td><input type="text" class="form-input app-notes" value="${app.notes || ''}" placeholder="Conditions / notes"></td>
        <td style="width: 120px;"><input type="date" class="form-input app-date" value="${app.date || ''}"></td>
        <td style="width: 160px;"><input type="text" class="form-input app-sig" value="${app.signature || ''}" placeholder="Digital Signature stamp"></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 6. Data Hydration & Form State Serialization
  function populateForm(data) {
    if (!data) return;

    // Part 0
    if (data.header) {
      document.getElementById('f-assessment-id').value = data.header.assessmentId || '';
      document.getElementById('f-version').value = data.header.version || '';
      document.getElementById('f-system-name').value = data.header.systemName || '';
      document.getElementById('f-system-id').value = data.header.systemId || '';
      document.getElementById('f-assessment-type').value = data.header.assessmentType || 'New System';
      document.getElementById('f-department').value = data.header.department || '';
      document.getElementById('f-lead').value = data.header.lead || '';
      document.getElementById('f-project-lead').value = data.header.projectLead || '';
      document.getElementById('f-start-date').value = data.header.startDate || '';
      document.getElementById('f-completion-date').value = data.header.completionDate || '';
      document.getElementById('f-next-review').value = data.header.nextReviewDate || '';
    }

    // Part 1
    if (data.part1) {
      document.getElementById('f-purpose').value = data.part1.purpose || '';
      document.getElementById('f-problem').value = data.part1.problemSolved || '';
      document.getElementById('f-min-perf').value = data.part1.minAcceptablePerformance || '';
      document.getElementById('f-deploy-env').value = data.part1.deploymentEnv || '';
      document.getElementById('f-geography').value = data.part1.geography || '';
      document.getElementById('f-scale').value = data.part1.scale || '';
      document.getElementById('f-decision-stakes').value = data.part1.decisionStakes || 'Medium (influences decisions)';
      document.getElementById('f-non-ai-desc').value = data.part1.nonAiDescription || '';
      document.getElementById('f-oversight').value = data.part1.oversightLevel || 'Human-in-the-Loop';
      document.getElementById('f-override').value = data.part1.canOverride || 'Yes — always';
      document.getElementById('f-override-authority').value = data.part1.overrideAuthority || '';
      document.getElementById('f-labeled').value = data.part1.clearlyLabeled || 'Yes';
      document.getElementById('f-recourse').value = data.part1.recourseMechanism || '';

      // Checkboxes
      const taskBoxes = document.querySelectorAll('#cb-task-types input[type="checkbox"]');
      taskBoxes.forEach(cb => {
        cb.checked = (data.part1.tasks || []).includes(cb.value);
      });

      // Users table
      const usersTbody = document.querySelector('#table-users tbody');
      usersTbody.innerHTML = '';
      (data.part1.users || []).forEach(u => addUserRow(u));
    }

    // Part 2
    if (data.part2) {
      document.getElementById('f-mission').value = data.part2.missionAlignment || '';
      document.getElementById('f-principles').value = data.part2.principlesAlignment || 'Yes — fully aligned';
      document.getElementById('f-latent').value = data.part2.latentIncentives || '';
      renderValuesTable(data.part2.values || []);
    }

    // Part 3
    if (data.part3) {
      const regTbody = document.querySelector('#table-regulations tbody');
      regTbody.innerHTML = '';
      (data.part3.regulations || []).forEach(r => addRegulationRow(r));
      document.getElementById('f-legal-reviewer').value = data.part3.legalReviewer || '';
      document.getElementById('f-legal-date').value = data.part3.legalReviewDate || '';
      document.getElementById('f-legal-outcome').value = data.part3.legalOutcome || 'Cleared';
      document.getElementById('f-max-risk').value = data.part3.maxAcceptableRisk || 'Medium (🟡) with controls';
      document.getElementById('f-prohibited').value = data.part3.prohibitedUses || '';
    }

    // Part 4
    if (data.part4) {
      const benTbody = document.querySelector('#table-benefits tbody');
      benTbody.innerHTML = '';
      (data.part4.benefits || []).forEach(b => addBenefitRow(b));
      document.getElementById('f-equity-benefits').value = data.part4.equityBenefits || '';
      document.getElementById('f-evidence-limits').value = data.part4.evidenceLimitations || '';

      const evidenceBoxes = document.querySelectorAll('#cb-evidence-base input[type="checkbox"]');
      evidenceBoxes.forEach(cb => {
        cb.checked = (data.part4.evidenceBase || []).includes(cb.value);
      });
    }

    // Part 5
    if (data.part5) {
      const harmTbody = document.querySelector('#table-harms tbody');
      harmTbody.innerHTML = '';
      (data.part5.harms || []).forEach(h => addHarmRow(h));
      document.getElementById('f-systemic').value = data.part5.systemicRisks || '';
      document.getElementById('f-ai-interactions').value = data.part5.aiInteractions || '';
      document.getElementById('f-post-decom').value = data.part5.postDecomRisks || '';
    }

    // Part 6
    if (data.part6) {
      const mitTbody = document.querySelector('#table-mitigations tbody');
      mitTbody.innerHTML = '';
      (data.part6.mitigations || []).forEach(m => addMitigationRow(m));

      const accTbody = document.querySelector('#table-accepted-risks tbody');
      accTbody.innerHTML = '';
      (data.part6.acceptedRisks || []).forEach(a => addAcceptedRiskRow(a));
    }

    // Part 7
    if (data.part7) {
      const stkTbody = document.querySelector('#table-stakeholders tbody');
      stkTbody.innerHTML = '';
      (data.part7.stakeholders || []).forEach(s => addStakeholderRow(s));
      renderEngagementChecksTable(data.part7.qualityChecks || []);
    }

    // Part 8
    if (data.part8) {
      const tevvTbody = document.querySelector('#table-tevv-activities tbody');
      tevvTbody.innerHTML = '';
      (data.part8.tevvActivities || []).forEach(t => addTevvActivityRow(t));

      const metTbody = document.querySelector('#table-metrics tbody');
      metTbody.innerHTML = '';
      (data.part8.metrics || []).forEach(m => addMetricRow(m));

      document.getElementById('f-tevv-ref').value = data.part8.tevvReference || '';
      document.getElementById('f-independent-validator').value = data.part8.independentValidator || '';
    }

    // Part 9
    if (data.part9) {
      if (data.part9.findings) {
        document.getElementById('f-find-legal').value = data.part9.findings.legal || 'Clear';
        document.getElementById('f-find-mission').value = data.part9.findings.mission || 'Aligned';
        document.getElementById('f-find-benefit').value = data.part9.findings.netBenefit || 'Benefits outweigh risks';
        document.getElementById('f-find-residual').value = data.part9.findings.residualRisk || 'Low';
        document.getElementById('f-find-tevv').value = data.part9.findings.tevvPassed || 'Yes';
        document.getElementById('f-find-stakeholder').value = data.part9.findings.stakeholderEngaged || 'Yes';
      }

      const recRadio = document.querySelector(`input[name="rec-decision"][value="${data.part9.recommendation || 'GO'}"]`);
      if (recRadio) recRadio.checked = true;

      document.getElementById('f-rec-conditions').value = data.part9.conditions || '';
      document.getElementById('f-recommender').value = data.part9.recommender || '';
      document.getElementById('f-rec-date').value = data.part9.recommendationDate || '';
    }

    // Part 10
    if (data.part10) {
      renderApprovalsTable(data.part10.approvals || []);
    }

    syncHeaderBadges();
    recalculateRiskScorecard();
  }

  function serializeForm() {
    const data = {
      header: {
        assessmentId: document.getElementById('f-assessment-id').value,
        version: document.getElementById('f-version').value,
        systemName: document.getElementById('f-system-name').value,
        systemId: document.getElementById('f-system-id').value,
        assessmentType: document.getElementById('f-assessment-type').value,
        department: document.getElementById('f-department').value,
        lead: document.getElementById('f-lead').value,
        projectLead: document.getElementById('f-project-lead').value,
        startDate: document.getElementById('f-start-date').value,
        completionDate: document.getElementById('f-completion-date').value,
        nextReviewDate: document.getElementById('f-next-review').value
      },
      part1: {
        purpose: document.getElementById('f-purpose').value,
        tasks: Array.from(document.querySelectorAll('#cb-task-types input:checked')).map(cb => cb.value),
        problemSolved: document.getElementById('f-problem').value,
        minAcceptablePerformance: document.getElementById('f-min-perf').value,
        deploymentEnv: document.getElementById('f-deploy-env').value,
        geography: document.getElementById('f-geography').value,
        scale: document.getElementById('f-scale').value,
        decisionStakes: document.getElementById('f-decision-stakes').value,
        nonAiDescription: document.getElementById('f-non-ai-desc').value,
        oversightLevel: document.getElementById('f-oversight').value,
        canOverride: document.getElementById('f-override').value,
        overrideAuthority: document.getElementById('f-override-authority').value,
        clearlyLabeled: document.getElementById('f-labeled').value,
        recourseMechanism: document.getElementById('f-recourse').value,
        users: Array.from(document.querySelectorAll('#table-users tbody tr')).map(tr => ({
          group: tr.querySelector('.u-group')?.value || '',
          role: tr.querySelector('.u-role')?.value || '',
          count: tr.querySelector('.u-count')?.value || '',
          literacy: tr.querySelector('.u-lit')?.value || 'Medium'
        }))
      },
      part2: {
        missionAlignment: document.getElementById('f-mission').value,
        principlesAlignment: document.getElementById('f-principles').value,
        latentIncentives: document.getElementById('f-latent').value,
        values: Array.from(document.querySelectorAll('#table-values tbody tr')).map(tr => ({
          name: tr.cells[0]?.textContent || '',
          status: tr.querySelector('.v-status')?.value || 'Yes',
          notes: tr.querySelector('.v-notes')?.value || ''
        }))
      },
      part3: {
        regulations: Array.from(document.querySelectorAll('#table-regulations tbody tr')).map(tr => ({
          area: tr.querySelector('.r-area')?.value || '',
          applicable: tr.querySelector('.r-app')?.value || 'Yes',
          law: tr.querySelector('.r-law')?.value || '',
          status: tr.querySelector('.r-stat')?.value || 'Compliant'
        })),
        legalReviewer: document.getElementById('f-legal-reviewer').value,
        legalReviewDate: document.getElementById('f-legal-date').value,
        legalOutcome: document.getElementById('f-legal-outcome').value,
        maxAcceptableRisk: document.getElementById('f-max-risk').value,
        prohibitedUses: document.getElementById('f-prohibited').value
      },
      part4: {
        benefits: Array.from(document.querySelectorAll('#table-benefits tbody tr')).map(tr => ({
          benefit: tr.querySelector('.b-benefit')?.value || '',
          beneficiary: tr.querySelector('.b-bene')?.value || '',
          howMeasured: tr.querySelector('.b-metric')?.value || '',
          confidence: tr.querySelector('.b-conf')?.value || 'High'
        })),
        equityBenefits: document.getElementById('f-equity-benefits').value,
        evidenceBase: Array.from(document.querySelectorAll('#cb-evidence-base input:checked')).map(cb => cb.value),
        evidenceLimitations: document.getElementById('f-evidence-limits').value
      },
      part5: {
        harms: Array.from(document.querySelectorAll('#table-harms tbody tr')).map(tr => ({
          id: tr.querySelector('.h-id')?.value || '',
          description: tr.querySelector('.h-desc')?.value || '',
          who: tr.querySelector('.h-who')?.value || '',
          dimension: tr.querySelector('.h-dim')?.value || 'Reliability',
          likelihood: parseInt(tr.querySelector('.h-l')?.value, 10) || 1,
          impact: parseInt(tr.querySelector('.h-i')?.value, 10) || 1
        })),
        systemicRisks: document.getElementById('f-systemic').value,
        aiInteractions: document.getElementById('f-ai-interactions').value,
        postDecomRisks: document.getElementById('f-post-decom').value
      },
      part6: {
        mitigations: Array.from(document.querySelectorAll('#table-mitigations tbody tr')).map(tr => ({
          harmId: tr.querySelector('.m-harm-id')?.value || '',
          responseType: tr.querySelector('.m-type')?.value || 'Mitigate',
          action: tr.querySelector('.m-action')?.value || '',
          owner: tr.querySelector('.m-owner')?.value || '',
          targetDate: tr.querySelector('.m-date')?.value || '',
          residual: tr.querySelector('.m-residual')?.value || 'Low'
        })),
        acceptedRisks: Array.from(document.querySelectorAll('#table-accepted-risks tbody tr')).map(tr => ({
          harmId: tr.querySelector('.acc-id')?.value || '',
          residualLevel: tr.querySelector('.acc-level')?.value || 'Low',
          rationale: tr.querySelector('.acc-rat')?.value || '',
          acceptedBy: tr.querySelector('.acc-by')?.value || '',
          date: tr.querySelector('.acc-date')?.value || ''
        }))
      },
      part7: {
        stakeholders: Array.from(document.querySelectorAll('#table-stakeholders tbody tr')).map(tr => ({
          group: tr.querySelector('.s-group')?.value || '',
          type: tr.querySelector('.s-type')?.value || 'Internal operator',
          method: tr.querySelector('.s-method')?.value || '',
          date: tr.querySelector('.s-date')?.value || '',
          feedback: tr.querySelector('.s-feedback')?.value || ''
        })),
        qualityChecks: Array.from(document.querySelectorAll('#table-engagement-checks tbody tr')).map(tr => ({
          criterion: tr.cells[0]?.textContent || '',
          met: tr.querySelector('.eq-met')?.value || 'Yes',
          notes: tr.querySelector('.eq-notes')?.value || ''
        }))
      },
      part8: {
        tevvActivities: Array.from(document.querySelectorAll('#table-tevv-activities tbody tr')).map(tr => ({
          activity: tr.querySelector('.t-act')?.value || '',
          completed: tr.querySelector('.t-comp')?.value || 'Yes',
          date: tr.querySelector('.t-date')?.value || '',
          conductedBy: tr.querySelector('.t-by')?.value || '',
          findings: tr.querySelector('.t-findings')?.value || ''
        })),
        metrics: Array.from(document.querySelectorAll('#table-metrics tbody tr')).map(tr => ({
          metric: tr.querySelector('.met-name')?.value || '',
          threshold: tr.querySelector('.met-thresh')?.value || '',
          actual: tr.querySelector('.met-actual')?.value || '',
          result: tr.querySelector('.met-res')?.value || 'Pass'
        })),
        tevvReference: document.getElementById('f-tevv-ref').value,
        independentValidator: document.getElementById('f-independent-validator').value
      },
      part9: {
        findings: {
          legal: document.getElementById('f-find-legal').value,
          mission: document.getElementById('f-find-mission').value,
          netBenefit: document.getElementById('f-find-benefit').value,
          residualRisk: document.getElementById('f-find-residual').value,
          tevvPassed: document.getElementById('f-find-tevv').value,
          stakeholderEngaged: document.getElementById('f-find-stakeholder').value
        },
        recommendation: document.querySelector('input[name="rec-decision"]:checked')?.value || 'GO',
        conditions: document.getElementById('f-rec-conditions').value,
        recommender: document.getElementById('f-recommender').value,
        recommendationDate: document.getElementById('f-rec-date').value
      },
      part10: {
        approvals: Array.from(document.querySelectorAll('#table-approvals tbody tr')).map(tr => ({
          role: tr.cells[0]?.textContent || '',
          name: tr.querySelector('.app-name')?.value || '',
          decision: tr.querySelector('.app-dec')?.value || 'Approved',
          notes: tr.querySelector('.app-notes')?.value || '',
          date: tr.querySelector('.app-date')?.value || '',
          signature: tr.querySelector('.app-sig')?.value || ''
        }))
      }
    };
    return data;
  }

  // 7. Preset and Blank Handlers
  btnLoadPreset.addEventListener('click', () => {
    populateForm(FINASSIST_PRESET);
    showToast('Loaded FinAssist AI sample assessment data');
  });

  btnBlankForm.addEventListener('click', () => {
    if (confirm('Clear current form and start a blank assessment?')) {
      const blankData = {
        header: { assessmentId: 'AIIA-2026-001', systemName: '', systemId: '', version: 'v1.0', assessmentType: 'New System', department: '', lead: '', projectLead: '', startDate: '', completionDate: '', nextReviewDate: '' },
        part1: { purpose: '', tasks: [], problemSolved: '', minAcceptablePerformance: '', deploymentEnv: '', geography: '', scale: '', decisionStakes: 'Low (informational only)', nonAiDescription: '', oversightLevel: 'Human-in-the-Loop', canOverride: 'Yes — always', overrideAuthority: '', clearlyLabeled: 'Yes', recourseMechanism: '', users: [{ group: '', role: '', count: '', literacy: 'Medium' }] },
        part2: { missionAlignment: '', principlesAlignment: 'Yes — fully aligned', latentIncentives: '', values: [] },
        part3: { regulations: [{ area: 'Data Privacy', applicable: 'Yes', law: '', status: 'Compliant' }], legalReviewer: '', legalReviewDate: '', legalOutcome: 'Cleared', maxAcceptableRisk: 'Medium (🟡) with controls', prohibitedUses: '' },
        part4: { benefits: [{ benefit: '', beneficiary: '', howMeasured: '', confidence: 'High' }], equityBenefits: '', evidenceBase: [], evidenceLimitations: '' },
        part5: { harms: [{ id: 'H-01', description: '', who: '', dimension: 'Reliability', likelihood: 2, impact: 2 }], systemicRisks: '', aiInteractions: '', postDecomRisks: '' },
        part6: { mitigations: [{ harmId: 'H-01', responseType: 'Mitigate', action: '', owner: '', targetDate: '', residual: 'Low' }], acceptedRisks: [] },
        part7: { stakeholders: [{ group: '', type: 'Internal operator', method: '', date: '', feedback: '' }], qualityChecks: [] },
        part8: { tevvActivities: [{ activity: '', completed: 'Yes', date: '', conductedBy: '', findings: '' }], metrics: [{ metric: '', threshold: '', actual: '', result: 'Pass' }], tevvReference: '', independentValidator: '' },
        part9: { findings: { legal: 'Clear', mission: 'Aligned', netBenefit: 'Benefits outweigh risks', residualRisk: 'Low', tevvPassed: 'Yes', stakeholderEngaged: 'Yes' }, recommendation: 'GO', conditions: '', recommender: '', recommendationDate: '' },
        part10: { approvals: [] }
      };
      populateForm(blankData);
      showToast('Form reset to blank assessment');
    }
  });

  // 8. Auto-Save to LocalStorage
  document.getElementById('aiia-form').addEventListener('input', () => {
    const data = serializeForm();
    localStorage.setItem('aiia_assessment_data', JSON.stringify(data));
  });

  // 9. Export & Import JSON
  btnExportJson.addEventListener('click', () => {
    const data = serializeForm();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AIIA_${data.header.systemId || 'Assessment'}_${data.header.assessmentId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Assessment JSON exported');
  });

  btnImportJsonTrigger.addEventListener('click', () => jsonFileInput.click());
  jsonFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        populateForm(parsed);
        showToast('Successfully loaded assessment JSON');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    jsonFileInput.value = '';
  });

  // 10. Markdown Export Generator
  function generateMarkdown() {
    const d = serializeForm();
    return `# AI Impact Assessment Report: ${d.header.systemName || 'AI System'}
**Framework:** NIST AI RMF 1.0 — GOVERN 4.2 · MAP 3.1 · MAP 3.2 · MAP 5.1 · MAP 5.2  
**Assessment ID:** ${d.header.assessmentId} | **System ID:** ${d.header.systemId}  
**Version:** ${d.header.version} | **Status:** Signed Off | **Date:** ${d.header.completionDate}  
**Lead Assessor:** ${d.header.lead}  
**AI Project Lead:** ${d.header.projectLead}  

---

## Part 0 — Assessment Header

| Field | Details |
|---|---|
| **Assessment ID** | ${d.header.assessmentId} |
| **AI System Name** | ${d.header.systemName} |
| **AI System ID** | ${d.header.systemId} |
| **Assessment Version** | ${d.header.version} |
| **Assessment Type** | ${d.header.assessmentType} |
| **Assessment Lead** | ${d.header.lead} |
| **AI Project Lead** | ${d.header.projectLead} |
| **Department / Business Unit** | ${d.header.department} |
| **Assessment Start Date** | ${d.header.startDate} |
| **Assessment Completion Date** | ${d.header.completionDate} |
| **Next Scheduled Review** | ${d.header.nextReviewDate} |

---

## Part 1 — AI System Overview

### 1.1 System Purpose & Description
${d.part1.purpose}

**AI Tasks Performed:**
${d.part1.tasks.map(t => `- [x] ${t}`).join('\n')}

**Problem Solved:**
${d.part1.problemSolved}

**Minimum Acceptable Performance:**
${d.part1.minAcceptablePerformance}

### 1.2 Context of Use
| Field | Details |
|---|---|
| **Deployment Environment** | ${d.part1.deploymentEnv} |
| **Operational Geography** | ${d.part1.geography} |
| **Scale of Deployment** | ${d.part1.scale} |
| **Decision Stakes** | ${d.part1.decisionStakes} |
| **Non-AI Alternative & Justification** | ${d.part1.nonAiDescription} |

### 1.3 Intended Users & Operators
| User / Operator Group | Role | Estimated Count | Technical Literacy |
|---|---|---|---|
${d.part1.users.map(u => `| ${u.group} | ${u.role} | ${u.count} | ${u.literacy} |`).join('\n')}

### 1.4 Human-AI Configuration
| Field | Details |
|---|---|
| **Oversight Level** | ${d.part1.oversightLevel} |
| **Can humans override AI output?** | ${d.part1.canOverride} |
| **Override Authority** | ${d.part1.overrideAuthority} |
| **Clearly Labeled as AI?** | ${d.part1.clearlyLabeled} |
| **Recourse Mechanism** | ${d.part1.recourseMechanism} |

---

## Part 2 — Organizational Mission Alignment

### 2.1 Mission & Values
${d.part2.missionAlignment}

**Principles Alignment:** ${d.part2.principlesAlignment}  
**Latent Incentives:** ${d.part2.latentIncentives}

### 2.2 Societal Values Alignment
| Value | Aligned? | Notes |
|---|---|---|
${d.part2.values.map(v => `| ${v.name} | ${v.status} | ${v.notes} |`).join('\n')}

---

## Part 3 — Risk Tolerance & Legal Review

### 3.1 Legal & Regulatory Review
| Requirement Area | Applicable? | Law / Regulation | Compliance Status |
|---|---|---|---|
${d.part3.regulations.map(r => `| ${r.area} | ${r.applicable} | ${r.law} | ${r.status} |`).join('\n')}

**Legal Review Completed By:** ${d.part3.legalReviewer} (${d.part3.legalReviewDate})  
**Legal Outcome:** ${d.part3.legalOutcome}  
**Maximum Risk Appetite:** ${d.part3.maxAcceptableRisk}  
**Prohibited Uses:** ${d.part3.prohibitedUses}

---

## Part 4 — Potential Benefits & Evidence

### 4.1 Intended Benefits
| Intended Benefit | Beneficiary Group | How Measured | Confidence Level |
|---|---|---|---|
${d.part4.benefits.map(b => `| ${b.benefit} | ${b.beneficiary} | ${b.howMeasured} | ${b.confidence} |`).join('\n')}

**Equity Benefits:** ${d.part4.equityBenefits}  
**Evidence Base:** ${d.part4.evidenceBase.join(', ')}  
**Evidence Limitations:** ${d.part4.evidenceLimitations}

---

## Part 5 — Potential Harms & Risk Scoring Matrix

| Harm ID | Harm Description | Affected Group | Dimension | Likelihood | Impact | Score | Risk Level |
|---|---|---|---|---|---|---|---|
${d.part5.harms.map(h => {
  const s = h.likelihood * h.impact;
  return `| ${h.id} | ${h.description} | ${h.who} | ${h.dimension} | ${h.likelihood} | ${h.impact} | ${s} | **${getRiskLevelText(s)}** |`;
}).join('\n')}

**Systemic Population Risks:** ${d.part5.systemicRisks}  
**Multi-AI Dependencies:** ${d.part5.aiInteractions}  
**Post-Decommissioning Risks:** ${d.part5.postDecomRisks}

---

## Part 6 — Risk Mitigation Plan

### 6.1 Mitigation Controls
| Harm ID | Response Type | Concrete Mitigation Action | Owner | Target Date | Residual Risk |
|---|---|---|---|---|---|
${d.part6.mitigations.map(m => `| ${m.harmId} | ${m.responseType} | ${m.action} | ${m.owner} | ${m.targetDate} | ${m.residual} |`).join('\n')}

### 6.2 Accepted Residual Risks
| Harm ID | Residual Level | Acceptance Rationale | Accepted By | Date |
|---|---|---|---|---|
${d.part6.acceptedRisks.map(a => `| ${a.harmId} | ${a.residualLevel} | ${a.rationale} | ${a.acceptedBy} | ${a.date} |`).join('\n')}

---

## Part 7 — Stakeholder Engagement

### 7.1 Consultations Log
| Stakeholder Group | Type | Method | Date | Key Feedback |
|---|---|---|---|---|
${d.part7.stakeholders.map(s => `| ${s.group} | ${s.type} | ${s.method} | ${s.date} | ${s.feedback} |`).join('\n')}

### 7.2 Engagement Quality Check
| Criterion | Met? | Evidence & Notes |
|---|---|---|
${d.part7.qualityChecks.map(c => `| ${c.criterion} | ${c.met} | ${c.notes} |`).join('\n')}

---

## Part 8 — TEVV Summary & Benchmarks

### 8.1 TEVV Activities Conducted
| Activity | Completed? | Date | Conducted By | Findings |
|---|---|---|---|---|
${d.part8.tevvActivities.map(t => `| ${t.activity} | ${t.completed} | ${t.date} | ${t.conductedBy} | ${t.findings} |`).join('\n')}

### 8.2 Quantitative Metrics
| Metric | Threshold | Actual Result | Status |
|---|---|---|---|
${d.part8.metrics.map(m => `| ${m.metric} | ${m.threshold} | ${m.actual} | **${m.result}** |`).join('\n')}

**TEVV Report Reference:** ${d.part8.tevvReference}  
**Independent Validator:** ${d.part8.independentValidator}

---

## Part 9 — Go / No-Go Deployment Recommendation

### 9.1 Summary Scorecard
- **Legal Compliance:** ${d.part9.findings.legal}
- **Mission Alignment:** ${d.part9.findings.mission}
- **Net Benefit vs. Risk:** ${d.part9.findings.netBenefit}
- **Residual Risk Level:** ${d.part9.findings.residualRisk}
- **TEVV Verification:** ${d.part9.findings.tevvPassed}
- **Stakeholder Consultations:** ${d.part9.findings.stakeholderEngaged}

### 9.2 Recommendation
> **Decision:** **${d.part9.recommendation}**  
> **Deployment Conditions:** ${d.part9.conditions}  
> **Prepared By:** ${d.part9.recommender} (${d.part9.recommendationDate})

---

## Part 10 — Sign-Off & Approvals

| Role | Signatory Name | Decision | Conditions / Notes | Date | Signature Stamp |
|---|---|---|---|---|---|
${d.part10.approvals.map(a => `| **${a.role}** | ${a.name} | ${a.decision} | ${a.notes} | ${a.date} | \`${a.signature}\` |`).join('\n')}

---
*Report generated via SamaBrains AI Impact Assessment Studio. Aligned with NIST AI RMF 1.0 & ISO/IEC 42001.*
`;
  }

  function downloadMarkdown() {
    const md = generateMarkdown();
    const d = serializeForm();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Impact_Assessment_${d.header.systemId || 'SYS-001'}_${d.header.assessmentId}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded Markdown (.md) report');
  }

  btnExportMd.addEventListener('click', downloadMarkdown);
  btnExportMdBottom?.addEventListener('click', downloadMarkdown);

  // 11. Print PDF Trigger
  function triggerPrintPdf() {
    showToast('Preparing executive print view...');
    setTimeout(() => {
      window.print();
    }, 250);
  }

  btnPrintPdf.addEventListener('click', triggerPrintPdf);
  btnPrintPdfBottom?.addEventListener('click', triggerPrintPdf);

  // Initial Load (Check localStorage first, otherwise load FinAssist Preset)
  const savedData = localStorage.getItem('aiia_assessment_data');
  if (savedData) {
    try {
      populateForm(JSON.parse(savedData));
    } catch (e) {
      populateForm(FINASSIST_PRESET);
    }
  } else {
    populateForm(FINASSIST_PRESET);
  }
});
