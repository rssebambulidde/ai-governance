/**
 * AI Impact Assessment Studio — Client-Side Application Engine
 * Aligned with NIST AI RMF 1.0 (GOVERN 4.2 · MAP 3.1 · MAP 5.1 · MANAGE 1.1)
 */

function initAntigravityGovernanceApp() {
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

  // ==========================================================================
  // 0. HUB NAVIGATION & INVENTORY REGISTRY (GOVERN 1.6)
  // ==========================================================================
  function switchHubView(target, updateHash = true) {
    const allTabs = [
      { id: 'inventory', btn: document.getElementById('tab-nav-inventory'), view: document.getElementById('view-inventory'), act: document.getElementById('actions-inventory') },
      { id: 'roles', btn: document.getElementById('tab-nav-roles'), view: document.getElementById('view-roles'), act: document.getElementById('actions-roles') },
      { id: 'assessment', btn: document.getElementById('tab-nav-assessment'), view: document.getElementById('view-assessment'), act: document.getElementById('actions-assessment') }
    ];

    allTabs.forEach(t => {
      t.btn?.classList.remove('active');
      t.btn?.setAttribute('aria-selected', 'false');
      if (t.view) {
        t.view.classList.remove('active');
        t.view.style.display = 'none';
      }
      if (t.act) t.act.style.display = 'none';
    });

    const activeItem = allTabs.find(t => t.id === target) || allTabs[0];
    activeItem.btn?.classList.add('active');
    activeItem.btn?.setAttribute('aria-selected', 'true');
    if (activeItem.view) {
      activeItem.view.classList.add('active');
      activeItem.view.style.display = 'block';
    }
    if (activeItem.act) activeItem.act.style.display = 'flex';

    if (target === 'inventory') {
      renderInventoryTable();
    } else if (target === 'roles') {
      renderRolesModule();
    } else {
      syncHeaderBadges();
      updateProgress();
    }

    if (updateHash && window.location.hash !== `#${target}`) {
      try {
        window.history.replaceState(null, '', `#${target}`);
      } catch (e) {
        // Fallback for sandboxed iframes
        window.location.hash = target;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Expose switchHubView globally for direct inline onclick and integrations
  window.switchHubView = switchHubView;

  document.getElementById('tab-nav-inventory')?.addEventListener('click', () => switchHubView('inventory'));
  document.getElementById('tab-nav-roles')?.addEventListener('click', () => switchHubView('roles'));
  document.getElementById('tab-nav-assessment')?.addEventListener('click', () => switchHubView('assessment'));

  // Inventory Data State
  let inventorySystems = [];

  function loadInventoryState() {
    const saved = localStorage.getItem('ai_inventory_systems');
    if (saved) {
      try {
        inventorySystems = JSON.parse(saved);
      } catch (e) {
        inventorySystems = typeof DEFAULT_INVENTORY_SYSTEMS !== 'undefined' ? [...DEFAULT_INVENTORY_SYSTEMS] : [];
      }
    } else {
      inventorySystems = typeof DEFAULT_INVENTORY_SYSTEMS !== 'undefined' ? [...DEFAULT_INVENTORY_SYSTEMS] : [];
    }
  }

  function saveInventoryState() {
    localStorage.setItem('ai_inventory_systems', JSON.stringify(inventorySystems));
  }

  // Inventory UI Elements
  const inventoryTbody = document.getElementById('inventory-table-body');
  const searchInput = document.getElementById('inventory-search');
  const filterDept = document.getElementById('filter-dept');
  const filterRisk = document.getElementById('filter-risk');
  const filterStatus = document.getElementById('filter-status');
  const btnResetFilters = document.getElementById('btn-reset-filters');
  const inventoryCountText = document.getElementById('inventory-count-text');

  // KPI elements
  const kpiTotal = document.getElementById('kpi-total-systems');
  const kpiHighRisk = document.getElementById('kpi-high-risk-systems');
  const kpiProd = document.getElementById('kpi-prod-systems');
  const kpiAssessed = document.getElementById('kpi-assessed-systems');

  function updateKpis() {
    if (!kpiTotal) return;
    kpiTotal.textContent = inventorySystems.length;
    const highCrit = inventorySystems.filter(s => s.riskLevel === 'Critical' || s.riskLevel === 'High').length;
    if (kpiHighRisk) kpiHighRisk.textContent = highCrit;
    const prod = inventorySystems.filter(s => (s.deploymentStatus || '').includes('Production')).length;
    if (kpiProd) kpiProd.textContent = prod;
    const assessed = inventorySystems.filter(s => s.assessmentStatus === 'Signed Off').length;
    if (kpiAssessed) kpiAssessed.textContent = `${assessed} / ${inventorySystems.length}`;
  }

  function populateDeptDropdown() {
    if (!filterDept) return;
    const currentVal = filterDept.value;
    const depts = Array.from(new Set(inventorySystems.map(s => s.department).filter(Boolean))).sort();
    filterDept.innerHTML = '<option value="ALL">All Departments</option>';
    depts.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      filterDept.appendChild(opt);
    });
    if (depts.includes(currentVal)) {
      filterDept.value = currentVal;
    }
  }

  function getStatusBadgeHtml(status) {
    const s = status || 'Planning';
    let cls = 'prod';
    if (s.includes('Testing') || s.includes('TEVV')) cls = 'testing';
    else if (s.includes('Planning') || s.includes('Development') || s.includes('Pre-Development')) cls = 'predev';
    else if (s.includes('Decom')) cls = 'decom';
    return `<span class="status-badge-pill ${cls}">${escapeHtml(s)}</span>`;
  }

  function getRiskBadgeHtml(risk) {
    const r = (risk || 'Low').toLowerCase();
    let cls = 'low';
    let label = 'Low (🟢)';
    if (r.includes('crit')) { cls = 'crit'; label = 'Critical (🔴)'; }
    else if (r.includes('high')) { cls = 'high'; label = 'High (🟠)'; }
    else if (r.includes('med')) { cls = 'med'; label = 'Medium (🟡)'; }
    return `<span class="badge-risk ${cls}">${label}</span>`;
  }

  function renderInventoryTable() {
    if (!inventoryTbody) return;
    updateKpis();
    populateDeptDropdown();

    const q = (searchInput?.value || '').toLowerCase().trim();
    const selDept = filterDept?.value || 'ALL';
    const selRisk = filterRisk?.value || 'ALL';
    const selStatus = filterStatus?.value || 'ALL';

    const filtered = inventorySystems.filter(s => {
      if (selDept !== 'ALL' && s.department !== selDept) return false;
      if (selRisk !== 'ALL' && s.riskLevel !== selRisk) return false;
      if (selStatus !== 'ALL' && s.deploymentStatus !== selStatus) return false;
      if (q) {
        const text = `${s.id} ${s.name} ${s.department} ${s.purpose} ${s.taskType} ${s.accountableOwner} ${s.thirdParty}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });

    if (inventoryCountText) {
      inventoryCountText.textContent = `Showing ${filtered.length} of ${inventorySystems.length} systems`;
    }

    if (filtered.length === 0) {
      inventoryTbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 2.5rem; color: var(--text-muted);">
            No matching AI systems found in registry.
          </td>
        </tr>
      `;
      return;
    }

    inventoryTbody.innerHTML = filtered.map(sys => `
      <tr>
        <td class="inv-id-cell">${escapeHtml(sys.id)}</td>
        <td>
          <span class="inv-name">${escapeHtml(sys.name)}</span>
          <span class="inv-dept">${escapeHtml(sys.department)}</span>
        </td>
        <td>
          <div class="inv-purpose" title="${escapeHtml(sys.purpose)}">${escapeHtml(sys.purpose)}</div>
          <div class="inv-task">${escapeHtml(sys.taskType)}</div>
        </td>
        <td>${getRiskBadgeHtml(sys.riskLevel)}</td>
        <td>${getStatusBadgeHtml(sys.deploymentStatus)}</td>
        <td>
          <span style="font-weight: 600; font-size: 0.8rem;">${escapeHtml(sys.tevvStatus || 'N/A')}</span>
          <div style="font-size: 0.72rem; color: var(--text-muted);">AIIA: ${escapeHtml(sys.assessmentStatus || 'Not Started')}</div>
        </td>
        <td style="font-size: 0.8rem; font-family: monospace;">${escapeHtml(sys.nextReviewDate || '—')}</td>
        <td style="text-align: center;">
          <div class="inv-row-actions">
            <button type="button" class="btn-action-assess" data-assess-id="${escapeHtml(sys.id)}" title="Open in Impact Assessment Studio">
              Assess
            </button>
            <button type="button" class="btn-action-icon" data-edit-id="${escapeHtml(sys.id)}" title="Edit system entry">
              ✏️
            </button>
            <button type="button" class="btn-action-icon del" data-del-id="${escapeHtml(sys.id)}" title="Delete system entry">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Attach listeners
    inventoryTbody.querySelectorAll('.btn-action-assess').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-assess-id');
        launchSystemAssessment(id);
      });
    });

    inventoryTbody.querySelectorAll('[data-edit-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-id');
        openEditModal(id);
      });
    });

    inventoryTbody.querySelectorAll('[data-del-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del-id');
        deleteSystem(id);
      });
    });
  }

  // Launch Assessment from Inventory
  function launchSystemAssessment(id) {
    const sys = inventorySystems.find(s => s.id === id);
    if (!sys) return;

    if (sys.id === 'AI-001' || sys.id === 'SYS-FIN-001') {
      populateForm(FINASSIST_PRESET);
    } else {
      document.getElementById('f-system-id').value = sys.id;
      document.getElementById('f-system-name').value = sys.name;
      document.getElementById('f-department').value = sys.department || '';
      document.getElementById('f-purpose').value = sys.purpose || '';
      document.getElementById('f-project-lead').value = sys.projectLead || '';
      document.getElementById('f-lead').value = sys.accountableOwner || '';
      const numPart = sys.id.replace(/\D/g, '') || '001';
      document.getElementById('f-assessment-id').value = `AIIA-2026-${numPart.padStart(3, '0')}`;
      syncHeaderBadges();
    }

    switchHubView('assessment');
    showToast(`Loaded ${sys.name} (${sys.id}) into Impact Assessment Studio`);
  }

  // Modal Handlers
  const modalSystem = document.getElementById('modal-register-system');
  const formSystemRegistry = document.getElementById('form-system-registry');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const modalTitle = document.getElementById('modal-system-title');
  const regEditId = document.getElementById('reg-edit-id');

  function openNewModal() {
    if (!modalSystem) return;
    regEditId.value = '';
    modalTitle.textContent = 'Register New AI System';
    formSystemRegistry.reset();
    const nextNum = inventorySystems.length + 1;
    document.getElementById('reg-system-id').value = `AI-${String(nextNum).padStart(3, '0')}`;
    document.getElementById('reg-last-review').value = '2026-10-18';
    document.getElementById('reg-next-review').value = '2027-04-18';
    modalSystem.style.display = 'flex';
  }

  function openEditModal(id) {
    if (!modalSystem) return;
    const sys = inventorySystems.find(s => s.id === id);
    if (!sys) return;
    regEditId.value = sys.id;
    modalTitle.textContent = `Edit AI System: ${sys.name} (${sys.id})`;

    document.getElementById('reg-system-id').value = sys.id;
    document.getElementById('reg-system-name').value = sys.name;
    document.getElementById('reg-department').value = sys.department;
    document.getElementById('reg-task-type').value = sys.taskType;
    document.getElementById('reg-purpose').value = sys.purpose;
    document.getElementById('reg-risk-level').value = sys.riskLevel;
    document.getElementById('reg-deployment-status').value = sys.deploymentStatus;
    document.getElementById('reg-tevv-status').value = sys.tevvStatus;
    document.getElementById('reg-data-types').value = sys.dataTypes;
    document.getElementById('reg-third-party').value = sys.thirdParty || '';
    document.getElementById('reg-accountable-owner').value = sys.accountableOwner;
    document.getElementById('reg-project-lead').value = sys.projectLead;
    document.getElementById('reg-dev-team').value = sys.devTeam || '';
    document.getElementById('reg-operator-team').value = sys.operatorTeam || '';
    document.getElementById('reg-last-review').value = sys.lastReviewDate || '';
    document.getElementById('reg-next-review').value = sys.nextReviewDate || '';
    document.getElementById('reg-assessment-status').value = sys.assessmentStatus || 'Signed Off';
    document.getElementById('reg-doc-link').value = sys.docLink || '';
    document.getElementById('reg-incident-link').value = sys.incidentLogLink || '';
    document.getElementById('reg-notes').value = sys.notes || '';

    modalSystem.style.display = 'flex';
  }

  function closeModal() {
    if (modalSystem) modalSystem.style.display = 'none';
  }

  document.getElementById('btn-open-register-modal')?.addEventListener('click', openNewModal);
  document.getElementById('btn-hero-register-modal')?.addEventListener('click', openNewModal);
  btnCloseModal?.addEventListener('click', closeModal);
  btnCancelModal?.addEventListener('click', closeModal);

  formSystemRegistry?.addEventListener('submit', (e) => {
    e.preventDefault();
    const isEdit = Boolean(regEditId.value);
    const sysData = {
      id: document.getElementById('reg-system-id').value.trim(),
      name: document.getElementById('reg-system-name').value.trim(),
      department: document.getElementById('reg-department').value.trim(),
      purpose: document.getElementById('reg-purpose').value.trim(),
      taskType: document.getElementById('reg-task-type').value.trim(),
      deploymentStatus: document.getElementById('reg-deployment-status').value,
      riskLevel: document.getElementById('reg-risk-level').value,
      dataTypes: document.getElementById('reg-data-types').value.trim(),
      thirdParty: document.getElementById('reg-third-party').value.trim(),
      accountableOwner: document.getElementById('reg-accountable-owner').value.trim(),
      projectLead: document.getElementById('reg-project-lead').value.trim(),
      devTeam: document.getElementById('reg-dev-team').value.trim(),
      operatorTeam: document.getElementById('reg-operator-team').value.trim(),
      tevvStatus: document.getElementById('reg-tevv-status').value,
      lastReviewDate: document.getElementById('reg-last-review').value,
      nextReviewDate: document.getElementById('reg-next-review').value,
      assessmentStatus: document.getElementById('reg-assessment-status').value,
      docLink: document.getElementById('reg-doc-link').value.trim(),
      incidentLogLink: document.getElementById('reg-incident-link').value.trim(),
      notes: document.getElementById('reg-notes').value.trim()
    };

    if (isEdit) {
      const idx = inventorySystems.findIndex(s => s.id === regEditId.value);
      if (idx !== -1) {
        inventorySystems[idx] = sysData;
        showToast(`Updated ${sysData.name} in inventory registry`);
      }
    } else {
      inventorySystems.push(sysData);
      showToast(`Registered ${sysData.name} (${sysData.id}) in inventory registry`);
    }

    saveInventoryState();
    closeModal();
    renderInventoryTable();
  });

  function deleteSystem(id) {
    const sys = inventorySystems.find(s => s.id === id);
    if (!sys) return;
    if (confirm(`Are you sure you want to delete ${sys.name} (${sys.id}) from the inventory registry?`)) {
      inventorySystems = inventorySystems.filter(s => s.id !== id);
      saveInventoryState();
      renderInventoryTable();
      showToast(`Removed ${sys.name} from inventory`);
    }
  }

  // Search & Filter Events
  searchInput?.addEventListener('input', renderInventoryTable);
  filterDept?.addEventListener('change', renderInventoryTable);
  filterRisk?.addEventListener('change', renderInventoryTable);
  filterStatus?.addEventListener('change', renderInventoryTable);
  btnResetFilters?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (filterDept) filterDept.value = 'ALL';
    if (filterRisk) filterRisk.value = 'ALL';
    if (filterStatus) filterStatus.value = 'ALL';
    renderInventoryTable();
  });

  // CSV Generation matching docs/01-govern/AI-System-Inventory.csv
  const CSV_HEADERS = [
    'ID', 'System_Name', 'Department_Owner', 'Business_Purpose', 'AI_Task_Type',
    'Deployment_Status', 'Risk_Level', 'Data_Types_Used', 'Third_Party_Components',
    'Accountable_Owner', 'AI_Project_Lead', 'Developer_Team', 'Operator_Team',
    'TEVV_Status', 'Last_Review_Date', 'Next_Review_Date', 'Impact_Assessment_Done',
    'Documentation_Repo_Link', 'Incident_Log_Link', 'Notes'
  ];

  function escapeCsvCell(val) {
    if (val === null || val === undefined) return '';
    const s = String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  }

  function exportInventoryCsv() {
    const rows = [CSV_HEADERS.join(',')];
    inventorySystems.forEach(s => {
      const row = [
        escapeCsvCell(s.id),
        escapeCsvCell(s.name),
        escapeCsvCell(s.department),
        escapeCsvCell(s.purpose),
        escapeCsvCell(s.taskType),
        escapeCsvCell(s.deploymentStatus),
        escapeCsvCell(s.riskLevel),
        escapeCsvCell(s.dataTypes),
        escapeCsvCell(s.thirdParty),
        escapeCsvCell(s.accountableOwner),
        escapeCsvCell(s.projectLead),
        escapeCsvCell(s.devTeam),
        escapeCsvCell(s.operatorTeam),
        escapeCsvCell(s.tevvStatus),
        escapeCsvCell(s.lastReviewDate),
        escapeCsvCell(s.nextReviewDate),
        escapeCsvCell(s.assessmentStatus),
        escapeCsvCell(s.docLink),
        escapeCsvCell(s.incidentLogLink),
        escapeCsvCell(s.notes)
      ];
      rows.push(row.join(','));
    });

    const csvContent = rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-System-Inventory.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported AI-System-Inventory.csv');
  }

  document.getElementById('btn-export-inventory-csv')?.addEventListener('click', exportInventoryCsv);
  document.getElementById('btn-sync-csv-repo')?.addEventListener('click', exportInventoryCsv);

  // CSV Import Parser
  const inventoryCsvInput = document.getElementById('inventory-csv-input');
  document.getElementById('btn-import-inventory-csv-trigger')?.addEventListener('click', () => {
    inventoryCsvInput?.click();
  });

  inventoryCsvInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        parseAndLoadCsv(text);
      } catch (err) {
        alert('Failed to parse CSV file: ' + err.message);
      }
    };
    reader.readAsText(file);
    inventoryCsvInput.value = '';
  });

  function parseAndLoadCsv(text) {
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) throw new Error('CSV is empty or missing data rows');

    function parseCsvLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current);
      return result;
    }

    const parsedSystems = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 2 || !cols[0]) continue;
      const sys = {
        id: cols[0]?.trim() || `AI-${i}`,
        name: cols[1]?.trim() || 'Untitled AI System',
        department: cols[2]?.trim() || 'General Operations',
        purpose: cols[3]?.trim() || '',
        taskType: cols[4]?.trim() || '',
        deploymentStatus: cols[5]?.trim() || 'Planning / Pre-Development',
        riskLevel: cols[6]?.trim() || 'High',
        dataTypes: cols[7]?.trim() || '',
        thirdParty: cols[8]?.trim() || '',
        accountableOwner: cols[9]?.trim() || '',
        projectLead: cols[10]?.trim() || '',
        devTeam: cols[11]?.trim() || '',
        operatorTeam: cols[12]?.trim() || '',
        tevvStatus: cols[13]?.trim() || 'Not Started',
        lastReviewDate: cols[14]?.trim() || '',
        nextReviewDate: cols[15]?.trim() || '',
        assessmentStatus: cols[16]?.trim() || 'Not Started',
        docLink: cols[17]?.trim() || '',
        incidentLogLink: cols[18]?.trim() || '',
        notes: cols[19]?.trim() || ''
      };
      parsedSystems.push(sys);
    }

    if (parsedSystems.length === 0) throw new Error('No valid system rows found');

    inventorySystems = parsedSystems;
    saveInventoryState();
    renderInventoryTable();
    showToast(`Successfully imported ${parsedSystems.length} systems from CSV`);
  }

  // Inventory Print PDF Generator
  function triggerPrintInventoryPdf() {
    const container = document.getElementById('print-inventory-report');
    if (!container) return;

    const previousTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');

    const html = `
      <div class="pr-header">
        <div>
          <div class="pr-org">SAMABRAINS ASSURANCE &amp; GOVERNANCE</div>
          <h1 class="pr-title">AI System Inventory &amp; Registry Report</h1>
          <div class="pr-subtitle">Operationalizing NIST AI Risk Management Framework 1.0 (NIST AI RMF — GOVERN 1.6)</div>
        </div>
        <div>
          <span class="pr-badge-go">GOVERN 1.6 COMPLIANT</span>
        </div>
      </div>

      <div class="pr-meta-box">
        <div class="pr-grid-4">
          <div class="pr-field">
            <span class="pr-label">Total AI Systems</span>
            <span class="pr-value" style="font-weight: 700;">${inventorySystems.length}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">High &amp; Critical Risk</span>
            <span class="pr-value" style="font-weight: 700;">${inventorySystems.filter(s => s.riskLevel === 'Critical' || s.riskLevel === 'High').length}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">In Production</span>
            <span class="pr-value">${inventorySystems.filter(s => (s.deploymentStatus || '').includes('Production')).length}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Report Generation Date</span>
            <span class="pr-value">${new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>
      </div>

      <div class="pr-section">
        <div class="pr-section-title">Organizational AI Systems Registry</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 8%;">ID</th>
              <th style="width: 16%;">System Name</th>
              <th style="width: 15%;">Department</th>
              <th>Business Purpose &amp; AI Tasks</th>
              <th style="width: 9%;">Risk Tier</th>
              <th style="width: 11%;">Status</th>
              <th style="width: 10%;">TEVV</th>
              <th style="width: 10%;">Next Review</th>
            </tr>
          </thead>
          <tbody>
            ${inventorySystems.map(s => `
              <tr>
                <td><strong>${escapeHtml(s.id)}</strong></td>
                <td><strong>${escapeHtml(s.name)}</strong></td>
                <td>${escapeHtml(s.department)}</td>
                <td>
                  <div>${escapeHtml(s.purpose)}</div>
                  <div style="font-size: 7pt; color: #475569; margin-top: 1pt;"><strong>Task:</strong> ${escapeHtml(s.taskType)}</div>
                </td>
                <td><span class="${getLevelBadgeClass(s.riskLevel)}">${escapeHtml(s.riskLevel)}</span></td>
                <td>${escapeHtml(s.deploymentStatus)}</td>
                <td>${escapeHtml(s.tevvStatus)}</td>
                <td style="font-family: monospace;">${escapeHtml(s.nextReviewDate || '—')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="pr-footer">
          Official AI System Inventory Registry · Generated by SamaBrains NIST AI Governance Hub · NIST AI RMF 1.0 (GOVERN 1.6)
        </div>
      </div>
    `;

    container.innerHTML = html;
    showToast('Opening Executive Inventory Print / PDF dialog...');

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const savedTheme = localStorage.getItem('aiia_theme') || previousTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }, 500);
    }, 200);
  }

  document.getElementById('btn-print-inventory-pdf')?.addEventListener('click', triggerPrintInventoryPdf);

  // ==========================================================================
  // 0.2 ROLES & RESPONSIBILITIES MATRIX MODULE (GOVERN 2 & 3.2)
  // ==========================================================================
  function switchRolesSubview(target) {
    const subtabs = [
      { id: 'raci', btn: document.getElementById('btn-sub-raci'), view: document.getElementById('subview-raci') },
      { id: 'catalog', btn: document.getElementById('btn-sub-catalog'), view: document.getElementById('subview-catalog') },
      { id: 'haii', btn: document.getElementById('btn-sub-haii'), view: document.getElementById('subview-haii') },
      { id: 'training', btn: document.getElementById('btn-sub-training'), view: document.getElementById('subview-training') }
    ];

    subtabs.forEach(s => {
      s.btn?.classList.remove('active');
      if (s.view) {
        s.view.classList.remove('active');
        s.view.style.display = 'none';
      }
    });

    const activeSub = subtabs.find(s => s.id === target) || subtabs[0];
    activeSub.btn?.classList.add('active');
    if (activeSub.view) {
      activeSub.view.classList.add('active');
      activeSub.view.style.display = 'block';
    }

    if (target === 'raci') renderRaciTable();
    else if (target === 'catalog') renderRolesCatalog();
    else if (target === 'haii') renderHaiiRegister();
    else if (target === 'training') renderTrainingTracker();
  }

  window.switchRolesSubview = switchRolesSubview;

  document.getElementById('btn-sub-raci')?.addEventListener('click', () => switchRolesSubview('raci'));
  document.getElementById('btn-sub-catalog')?.addEventListener('click', () => switchRolesSubview('catalog'));
  document.getElementById('btn-sub-haii')?.addEventListener('click', () => switchRolesSubview('haii'));
  document.getElementById('btn-sub-training')?.addEventListener('click', () => switchRolesSubview('training'));

  // Role IDs as columns in RACI table
  const RACI_ROLE_COLS = [
    { id: "gov-comm", short: "Gov Comm", full: "AI Governance Committee" },
    { id: "caio", short: "CAIO", full: "Chief AI Officer" },
    { id: "ai-risk-off", short: "Risk Off", full: "AI Risk Officer" },
    { id: "ai-ethics-off", short: "Ethics Off", full: "AI Ethics Officer" },
    { id: "legal-comp", short: "Legal", full: "Legal & Compliance" },
    { id: "dpo", short: "DPO", full: "Data Protection Officer" },
    { id: "ai-proj-lead", short: "Proj Lead", full: "AI Project Lead" },
    { id: "ml-eng", short: "ML Eng", full: "AI/ML Engineer" },
    { id: "data-eng", short: "Data Eng", full: "Data Engineer" },
    { id: "haii-spec", short: "HAII Spec", full: "Human-AI Specialist" },
    { id: "tevv-lead", short: "TEVV Lead", full: "TEVV Lead" },
    { id: "tevv-analyst", short: "TEVV Analyst", full: "TEVV Analyst" },
    { id: "ai-operator", short: "Operator", full: "AI System Operator" },
    { id: "inv-mgr", short: "Inv Mgr", full: "AI Inventory Manager" },
    { id: "incident-lead", short: "Incident", full: "Incident Response Lead" },
    { id: "comms-lead", short: "Comms", full: "Communications Lead" },
    { id: "red-team", short: "Red Team", full: "Adversarial Red Team" }
  ];

  const raciSearch = document.getElementById('raci-search');
  const raciFilterPhase = document.getElementById('raci-filter-phase');
  const raciFilterRole = document.getElementById('raci-filter-role');
  const btnResetRaciFilters = document.getElementById('btn-reset-raci-filters');
  const raciTableHead = document.getElementById('raci-table-head');
  const raciTableBody = document.getElementById('raci-table-body');
  const raciCountText = document.getElementById('raci-count-text');

  function populateRaciRoleFilter() {
    if (!raciFilterRole) return;
    const currentVal = raciFilterRole.value;
    raciFilterRole.innerHTML = '<option value="ALL">All Roles</option>';
    RACI_ROLE_COLS.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = `${r.full} (${r.short})`;
      raciFilterRole.appendChild(opt);
    });
    if (RACI_ROLE_COLS.some(r => r.id === currentVal)) {
      raciFilterRole.value = currentVal;
    }
  }

  function getRoleRaciTitle(code) {
    if (code === 'A') return 'Accountable (Decision owner)';
    if (code === 'R') return 'Responsible (Executes activity)';
    if (code === 'C') return 'Consulted (Two-way input)';
    if (code === 'I') return 'Informed (One-way update)';
    return code;
  }

  function renderRaciTable() {
    if (!raciTableHead || !raciTableBody) return;
    populateRaciRoleFilter();

    const selectedPhase = raciFilterPhase?.value || 'ALL';
    const selectedRole = raciFilterRole?.value || 'ALL';
    const query = (raciSearch?.value || '').toLowerCase().trim();

    // Table Header
    raciTableHead.innerHTML = `
      <tr>
        <th style="width: 4%;">#</th>
        <th style="width: 14%;">Phase</th>
        <th style="width: 8%;">Ref</th>
        <th style="width: 24%;">NIST AI RMF Lifecycle Activity</th>
        ${RACI_ROLE_COLS.map(r => `
          <th style="width: 3%;" title="${escapeHtml(r.full)}">${escapeHtml(r.short)}</th>
        `).join('')}
      </tr>
    `;

    const activities = typeof RACI_ACTIVITIES !== 'undefined' ? RACI_ACTIVITIES : [];
    const filtered = activities.filter(act => {
      if (selectedPhase !== 'ALL' && act.phase !== selectedPhase) return false;
      if (selectedRole !== 'ALL' && !act.raci[selectedRole]) return false;
      if (query) {
        const text = `${act.activity} ${act.phase} ${act.ref}`.toLowerCase();
        if (!text.includes(query)) return false;
      }
      return true;
    });

    if (raciCountText) {
      raciCountText.textContent = `Showing ${filtered.length} of ${activities.length} lifecycle activities`;
    }

    if (filtered.length === 0) {
      raciTableBody.innerHTML = `
        <tr>
          <td colspan="${4 + RACI_ROLE_COLS.length}" style="text-align:center; padding: 2.5rem; color: var(--text-muted);">
            No matching governance activities found.
          </td>
        </tr>
      `;
      return;
    }

    raciTableBody.innerHTML = filtered.map((act, idx) => `
      <tr>
        <td style="font-family: monospace; color: var(--text-muted);">${idx + 1}</td>
        <td><span style="font-size: 0.76rem; font-weight: 600;">${escapeHtml(act.phase)}</span></td>
        <td><code style="font-size: 0.72rem; color: var(--accent-cyan);">${escapeHtml(act.ref)}</code></td>
        <td style="font-weight: 600;">${escapeHtml(act.activity)}</td>
        ${RACI_ROLE_COLS.map(r => {
          const roleCode = act.raci[r.id];
          const isHighlight = selectedRole !== 'ALL' && selectedRole === r.id;
          const hlClass = isHighlight ? 'highlight-col' : '';
          if (!roleCode) {
            return `<td class="${hlClass}"><span style="color: var(--border-color); font-size: 0.75rem;">—</span></td>`;
          }
          const badgeClass = roleCode.toLowerCase();
          return `
            <td class="${hlClass}">
              <span class="raci-badge ${badgeClass}" title="${escapeHtml(r.full)}: ${getRoleRaciTitle(roleCode)}">${roleCode}</span>
            </td>
          `;
        }).join('')}
      </tr>
    `).join('');
  }

  raciSearch?.addEventListener('input', renderRaciTable);
  raciFilterPhase?.addEventListener('change', renderRaciTable);
  raciFilterRole?.addEventListener('change', renderRaciTable);
  btnResetRaciFilters?.addEventListener('click', () => {
    if (raciSearch) raciSearch.value = '';
    if (raciFilterPhase) raciFilterPhase.value = 'ALL';
    if (raciFilterRole) raciFilterRole.value = 'ALL';
    renderRaciTable();
  });

  // Render Role Catalog Cards
  function renderRolesCatalog() {
    const grid = document.getElementById('roles-catalog-grid');
    if (!grid) return;
    const roles = typeof ROLES_CATALOG !== 'undefined' ? ROLES_CATALOG : [];

    grid.innerHTML = roles.map(role => `
      <div class="role-card">
        <div class="role-card-header">
          <div>
            <h4 class="role-title">${escapeHtml(role.name)}</h4>
            <div class="role-reports">Reports to: <strong>${escapeHtml(role.reportsTo)}</strong></div>
          </div>
          <span class="role-tier-badge">${escapeHtml(role.tier)}</span>
        </div>
        <p class="role-desc">${escapeHtml(role.description)}</p>
        <div class="role-card-footer">
          <span>Deployment Authority:</span>
          ${role.vetoPower ? `
            <span class="role-veto-badge">⛔ Mandatory Veto</span>
          ` : `
            <span class="role-veto-badge none">— Operational Advisory</span>
          `}
        </div>
      </div>
    `).join('');
  }

  // Render Human-AI Oversight Configuration Register (GOVERN 3.2)
  function renderHaiiRegister() {
    const tbody = document.getElementById('haii-table-body');
    if (!tbody) return;
    const configs = typeof HUMAN_AI_CONFIGS !== 'undefined' ? HUMAN_AI_CONFIGS : [];

    tbody.innerHTML = configs.map(c => `
      <tr>
        <td class="inv-id-cell">${escapeHtml(c.systemId)}</td>
        <td><strong>${escapeHtml(c.systemName)}</strong></td>
        <td>
          <span class="status-badge-pill ${getHaiiClass(c.level)}">${escapeHtml(c.level)}</span>
        </td>
        <td style="font-size: 0.8rem; color: var(--text-secondary);">${escapeHtml(c.roleInOutput)}</td>
        <td style="font-weight: 600; font-size: 0.8rem;">${escapeHtml(c.overrideAuthority)}</td>
        <td style="font-size: 0.8rem;">${escapeHtml(c.mandatoryReview)}</td>
      </tr>
    `).join('');
  }

  function getHaiiClass(level) {
    if (level.includes('Control')) return 'decom';
    if (level.includes('Loop')) return 'testing';
    if (level.includes('Automated')) return 'crit';
    return 'prod';
  }

  // Render Training Tracker (GOVERN 2.2)
  function renderTrainingTracker() {
    const tbody = document.getElementById('training-table-body');
    if (!tbody) return;
    const trainees = typeof TRAINING_TRACKER !== 'undefined' ? TRAINING_TRACKER : [];

    tbody.innerHTML = trainees.map(t => `
      <tr>
        <td><strong>${escapeHtml(t.name)}</strong></td>
        <td>${escapeHtml(t.role)}</td>
        <td class="cell-check">${t.basics ? '✅' : '⬜'}</td>
        <td class="cell-check">${t.nistRmf ? '✅' : '⬜'}</td>
        <td class="cell-check">${t.biasFairness ? '✅' : '⬜'}</td>
        <td class="cell-check">${t.securityPrivacy ? '✅' : '⬜'}</td>
        <td class="cell-check">${t.incidentResp ? '✅' : '⬜'}</td>
        <td class="cell-check">${t.policy ? '✅' : '⬜'}</td>
      </tr>
    `).join('');
  }

  function renderRolesModule() {
    renderRaciTable();
    renderRolesCatalog();
    renderHaiiRegister();
    renderTrainingTracker();
  }

  // Export RACI CSV
  function exportRaciCsv() {
    const cols = ['Activity_ID', 'Lifecycle_Phase', 'NIST_Ref', 'Activity_Name', ...RACI_ROLE_COLS.map(r => r.id)];
    const rows = [cols.join(',')];

    (typeof RACI_ACTIVITIES !== 'undefined' ? RACI_ACTIVITIES : []).forEach(act => {
      const row = [
        escapeCsvCell(act.id),
        escapeCsvCell(act.phase),
        escapeCsvCell(act.ref),
        escapeCsvCell(act.activity),
        ...RACI_ROLE_COLS.map(r => escapeCsvCell(act.raci[r.id] || ''))
      ];
      rows.push(row.join(','));
    });

    const csvContent = rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Roles-RACI-Matrix.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported AI-Roles-RACI-Matrix.csv');
  }

  document.getElementById('btn-export-raci-csv')?.addEventListener('click', exportRaciCsv);
  document.getElementById('btn-export-raci-csv-table')?.addEventListener('click', exportRaciCsv);

  // Executive RACI Matrix PDF Generator
  function triggerPrintRolesPdf() {
    const container = document.getElementById('print-roles-report');
    if (!container) return;

    const previousTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');

    const activities = typeof RACI_ACTIVITIES !== 'undefined' ? RACI_ACTIVITIES : [];

    const html = `
      <div class="pr-header">
        <div>
          <div class="pr-org">SAMABRAINS ASSURANCE &amp; GOVERNANCE</div>
          <h1 class="pr-title">AI Roles &amp; Responsibilities RACI Matrix</h1>
          <div class="pr-subtitle">Operationalizing NIST AI Risk Management Framework 1.0 (NIST AI RMF — GOVERN 2.1, 2.2, 2.3 &amp; 3.2)</div>
        </div>
        <div>
          <span class="pr-badge-go">GOVERN 2 COMPLIANT</span>
        </div>
      </div>

      <div class="pr-meta-box">
        <div class="pr-grid-4">
          <div class="pr-field">
            <span class="pr-label">Total Defined Roles</span>
            <span class="pr-value" style="font-weight: 700;">18 Roles</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Lifecycle Activities</span>
            <span class="pr-value" style="font-weight: 700;">28 Tasks</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Veto Authority Roles</span>
            <span class="pr-value" style="font-weight: 700;">7 Roles</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Date Generated</span>
            <span class="pr-value">${new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>
      </div>

      <div class="pr-section">
        <div class="pr-section-title">NIST AI RMF Lifecycle RACI Matrix</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 5%;">#</th>
              <th style="width: 14%;">Phase</th>
              <th style="width: 8%;">Ref</th>
              <th style="width: 25%;">Lifecycle Activity</th>
              ${RACI_ROLE_COLS.slice(0, 10).map(r => `
                <th style="text-align: center;">${escapeHtml(r.short)}</th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${activities.map((act, i) => `
              <tr>
                <td style="font-family: monospace;">${i + 1}</td>
                <td>${escapeHtml(act.phase)}</td>
                <td><strong>${escapeHtml(act.ref)}</strong></td>
                <td>${escapeHtml(act.activity)}</td>
                ${RACI_ROLE_COLS.slice(0, 10).map(r => {
                  const val = act.raci[r.id] || '—';
                  return `<td style="text-align: center; font-weight: 700;">${val}</td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="font-size: 7.5pt; color: #475569; margin-top: 4pt;">
          <strong>Legend:</strong> A = Accountable (Final decision owner) · R = Responsible (Executes task) · C = Consulted (Two-way input) · I = Informed (One-way notice)
        </div>
        <div class="pr-footer">
          Official AI Roles &amp; Responsibilities Document · Generated by SamaBrains NIST AI Governance Hub · NIST AI RMF 1.0 (GOVERN 2)
        </div>
      </div>
    `;

    container.innerHTML = html;
    showToast('Opening Executive RACI Print / PDF dialog...');

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const savedTheme = localStorage.getItem('aiia_theme') || previousTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }, 500);
    }, 200);
  }

  document.getElementById('btn-print-roles-pdf')?.addEventListener('click', triggerPrintRolesPdf);

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
*Report generated via SamaBrains NIST AI RMF Studio. Operationalizing NIST AI Risk Management Framework 1.0 (NIST AI RMF).*
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

  // 11. Executive Print & PDF Report Generation
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getScoreBadgeClass(score) {
    const num = parseInt(score, 10) || 1;
    if (num <= 4) return 'pr-risk-low';
    if (num <= 9) return 'pr-risk-med';
    if (num <= 16) return 'pr-risk-high';
    return 'pr-risk-crit';
  }

  function getLevelBadgeClass(lvl) {
    const l = (lvl || '').toLowerCase();
    if (l.includes('crit')) return 'pr-risk-crit';
    if (l.includes('high')) return 'pr-risk-high';
    if (l.includes('med')) return 'pr-risk-med';
    return 'pr-risk-low';
  }

  function renderPrintReport(d) {
    const container = document.getElementById('print-report');
    if (!container) return;

    const h = d.header || {};
    const p1 = d.part1 || {};
    const p2 = d.part2 || {};
    const p3 = d.part3 || {};
    const p4 = d.part4 || {};
    const p5 = d.part5 || {};
    const p6 = d.part6 || {};
    const p7 = d.part7 || {};
    const p8 = d.part8 || {};
    const p9 = d.part9 || {};
    const p10 = d.part10 || {};

    const recDecision = p9.recommendation || 'GO';
    let badgeClass = 'pr-badge-go';
    if (recDecision === 'CONDITIONAL') badgeClass = 'pr-badge-cond';
    if (recDecision === 'NO-GO') badgeClass = 'pr-badge-nogo';

    const html = `
      <!-- Executive Cover / Document Control -->
      <div class="pr-header">
        <div>
          <div class="pr-org">SAMABRAINS ASSURANCE &amp; GOVERNANCE</div>
          <h1 class="pr-title">AI Impact Assessment Report</h1>
          <div class="pr-subtitle">Operationalizing NIST AI Risk Management Framework 1.0 (NIST AI RMF — GOVERN · MAP · MEASURE · MANAGE)</div>
        </div>
        <div>
          <span class="${badgeClass}">${escapeHtml(recDecision)}</span>
        </div>
      </div>

      <!-- Metadata Grid Box -->
      <div class="pr-meta-box">
        <div class="pr-grid-4">
          <div class="pr-field">
            <span class="pr-label">System Name</span>
            <span class="pr-value" style="font-weight: 700;">${escapeHtml(h.systemName || 'N/A')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">System ID</span>
            <span class="pr-value">${escapeHtml(h.systemId || 'N/A')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Assessment ID</span>
            <span class="pr-value">${escapeHtml(h.assessmentId || 'N/A')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Version</span>
            <span class="pr-value">${escapeHtml(h.version || 'v1.0')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Assessment Type</span>
            <span class="pr-value">${escapeHtml(h.assessmentType || 'New System')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Business Unit</span>
            <span class="pr-value">${escapeHtml(h.department || 'N/A')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Lead Assessor</span>
            <span class="pr-value">${escapeHtml(h.lead || 'N/A')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Project / AI Lead</span>
            <span class="pr-value">${escapeHtml(h.projectLead || 'N/A')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Assessment Period</span>
            <span class="pr-value">${escapeHtml(h.startDate || '—')} to ${escapeHtml(h.completionDate || '—')}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Next Scheduled Review</span>
            <span class="pr-value">${escapeHtml(h.nextReviewDate || '—')}</span>
          </div>
        </div>
      </div>

      <!-- Executive Recommendation Banner -->
      <div class="pr-rec-banner">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5pt;">
          <span style="font-size: 9.5pt; font-weight: 800; text-transform: uppercase;">Executive Recommendation Decision</span>
          <span class="${badgeClass}">${escapeHtml(recDecision)}</span>
        </div>
        <div class="pr-field" style="margin-bottom: 5pt;">
          <span class="pr-label">Deployment Conditions &amp; Directives</span>
          <div class="pr-value">${escapeHtml(p9.conditions || 'None specified')}</div>
        </div>
        <div class="pr-grid-2" style="margin-top: 3pt; font-size: 7.8pt;">
          <div><strong>Recommender:</strong> ${escapeHtml(p9.recommender || 'N/A')}</div>
          <div><strong>Date:</strong> ${escapeHtml(p9.recommendationDate || 'N/A')}</div>
        </div>
        <div style="margin-top: 5pt; border-top: 1px dashed #cbd5e1; padding-top: 4pt;">
          <span class="pr-label">Core Governance Verification Findings</span>
          <div class="pr-grid-3" style="font-size: 7.5pt; margin-top: 2pt;">
            <div>Legal: <strong>${escapeHtml(p9.findings?.legal || 'Clear')}</strong></div>
            <div>Mission: <strong>${escapeHtml(p9.findings?.mission || 'Aligned')}</strong></div>
            <div>Net Benefit: <strong>${escapeHtml(p9.findings?.netBenefit || 'Positive')}</strong></div>
            <div>Residual Risk: <strong>${escapeHtml(p9.findings?.residualRisk || 'Low')}</strong></div>
            <div>TEVV Passed: <strong>${escapeHtml(p9.findings?.tevvPassed || 'Yes')}</strong></div>
            <div>Stakeholders: <strong>${escapeHtml(p9.findings?.stakeholderEngaged || 'Yes')}</strong></div>
          </div>
        </div>
      </div>

      <!-- Part 1 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 1 — System Purpose &amp; Operational Context (MAP 1 &amp; MAP 2)</div>
        <div class="pr-field">
          <span class="pr-label">Purpose &amp; Description</span>
          <div class="pr-value">${escapeHtml(p1.purpose || 'N/A')}</div>
        </div>
        <div class="pr-grid-2">
          <div class="pr-field">
            <span class="pr-label">Tasks Performed</span>
            <div class="pr-value">${escapeHtml((p1.tasks || []).join(', ') || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Minimum Acceptable Performance</span>
            <div class="pr-value">${escapeHtml(p1.minAcceptablePerformance || 'N/A')}</div>
          </div>
        </div>
        <div class="pr-field">
          <span class="pr-label">Problem Solved &amp; Business Value</span>
          <div class="pr-value">${escapeHtml(p1.problemSolved || 'N/A')}</div>
        </div>
        <div class="pr-grid-3">
          <div class="pr-field">
            <span class="pr-label">Deployment Environment</span>
            <div class="pr-value">${escapeHtml(p1.deploymentEnv || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Target Geography</span>
            <div class="pr-value">${escapeHtml(p1.geography || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">User Scale</span>
            <div class="pr-value">${escapeHtml(p1.scale || 'N/A')}</div>
          </div>
        </div>
        <div class="pr-grid-2">
          <div class="pr-field">
            <span class="pr-label">Decision Stakes</span>
            <div class="pr-value">${escapeHtml(p1.decisionStakes || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Non-AI Baseline Process</span>
            <div class="pr-value">${escapeHtml(p1.nonAiDescription || 'N/A')}</div>
          </div>
        </div>
        <div class="pr-grid-4">
          <div class="pr-field">
            <span class="pr-label">Oversight Model</span>
            <div class="pr-value">${escapeHtml(p1.oversightLevel || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Human Override</span>
            <div class="pr-value">${escapeHtml(p1.canOverride || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">AI Labeled</span>
            <div class="pr-value">${escapeHtml(p1.clearlyLabeled || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Override Authority</span>
            <div class="pr-value">${escapeHtml(p1.overrideAuthority || 'N/A')}</div>
          </div>
        </div>
        <div class="pr-field">
          <span class="pr-label">User Recourse Mechanism</span>
          <div class="pr-value">${escapeHtml(p1.recourseMechanism || 'N/A')}</div>
        </div>

        <div style="margin-top: 5pt;">
          <span class="pr-label">Impacted User Groups</span>
          <table class="pr-table">
            <thead>
              <tr>
                <th>User Group</th>
                <th>Role &amp; Interaction Mode</th>
                <th>Estimated Count</th>
                <th>AI Literacy Level</th>
              </tr>
            </thead>
            <tbody>
              ${(p1.users || []).map(u => `
                <tr>
                  <td><strong>${escapeHtml(u.group)}</strong></td>
                  <td>${escapeHtml(u.role)}</td>
                  <td>${escapeHtml(u.count)}</td>
                  <td>${escapeHtml(u.literacy)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Part 2 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 2 — Organizational Alignment &amp; Trustworthy AI (GOVERN 1 &amp; MAP 1)</div>
        <div class="pr-grid-2">
          <div class="pr-field">
            <span class="pr-label">Mission Alignment</span>
            <div class="pr-value">${escapeHtml(p2.missionAlignment || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Principles Alignment</span>
            <div class="pr-value">${escapeHtml(p2.principlesAlignment || 'N/A')}</div>
          </div>
        </div>
        <div class="pr-field">
          <span class="pr-label">Latent Incentives &amp; Unintended Behaviors</span>
          <div class="pr-value">${escapeHtml(p2.latentIncentives || 'N/A')}</div>
        </div>
        <div style="margin-top: 5pt;">
          <span class="pr-label">NIST Trustworthy AI Characteristics Review</span>
          <table class="pr-table">
            <thead>
              <tr>
                <th style="width: 25%;">Characteristic</th>
                <th style="width: 15%;">Aligned</th>
                <th>Operational Notes &amp; Governance Controls</th>
              </tr>
            </thead>
            <tbody>
              ${(p2.values || []).map(v => `
                <tr>
                  <td><strong>${escapeHtml(v.name)}</strong></td>
                  <td>${escapeHtml(v.status)}</td>
                  <td>${escapeHtml(v.notes)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Part 3 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 3 — Legal, Regulatory &amp; Governance Baseline (GOVERN 4.2 · MAP 1.1)</div>
        <div class="pr-field">
          <span class="pr-label">Applicable Legal &amp; Regulatory Standards</span>
          <table class="pr-table">
            <thead>
              <tr>
                <th>Regulatory Area</th>
                <th>Applicable</th>
                <th>Relevant Law / Standard</th>
                <th>Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              ${(p3.regulations || []).map(r => `
                <tr>
                  <td><strong>${escapeHtml(r.area)}</strong></td>
                  <td>${escapeHtml(r.applicable)}</td>
                  <td>${escapeHtml(r.law)}</td>
                  <td>${escapeHtml(r.status)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="pr-grid-3">
          <div class="pr-field">
            <span class="pr-label">Legal Reviewer</span>
            <div class="pr-value">${escapeHtml(p3.legalReviewer || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Review Date</span>
            <div class="pr-value">${escapeHtml(p3.legalReviewDate || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Review Outcome</span>
            <div class="pr-value"><strong>${escapeHtml(p3.legalOutcome || 'N/A')}</strong></div>
          </div>
        </div>
        <div class="pr-grid-2">
          <div class="pr-field">
            <span class="pr-label">Maximum Acceptable Risk Threshold</span>
            <div class="pr-value">${escapeHtml(p3.maxAcceptableRisk || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Explicitly Prohibited Uses</span>
            <div class="pr-value">${escapeHtml(p3.prohibitedUses || 'N/A')}</div>
          </div>
        </div>
      </div>

      <!-- Part 4 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 4 — Expected Benefits &amp; Value Justification (MAP 3.1)</div>
        <div class="pr-field">
          <span class="pr-label">Benefits Inventory</span>
          <table class="pr-table">
            <thead>
              <tr>
                <th>Expected Benefit</th>
                <th>Primary Beneficiary</th>
                <th>Measurement Metric / Target</th>
                <th>Confidence Level</th>
              </tr>
            </thead>
            <tbody>
              ${(p4.benefits || []).map(b => `
                <tr>
                  <td><strong>${escapeHtml(b.benefit)}</strong></td>
                  <td>${escapeHtml(b.beneficiary)}</td>
                  <td>${escapeHtml(b.howMeasured)}</td>
                  <td>${escapeHtml(b.confidence)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="pr-field">
          <span class="pr-label">Distribution of Benefits &amp; Equity Assessment</span>
          <div class="pr-value">${escapeHtml(p4.equityBenefits || 'N/A')}</div>
        </div>
        <div class="pr-grid-2">
          <div class="pr-field">
            <span class="pr-label">Evidence Base</span>
            <div class="pr-value">${escapeHtml((p4.evidenceBase || []).join(', ') || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Evidence Limitations</span>
            <div class="pr-value">${escapeHtml(p4.evidenceLimitations || 'N/A')}</div>
          </div>
        </div>
      </div>

      <!-- Part 5 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 5 — Potential Harms &amp; Inherent Risk Scorecard (MAP 5.1 · MEASURE 2)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 8%;">ID</th>
              <th>Potential Harm Description</th>
              <th>Who is Impacted</th>
              <th>NIST Dimension</th>
              <th style="width: 5%; text-align:center;">L</th>
              <th style="width: 5%; text-align:center;">I</th>
              <th style="width: 8%; text-align:center;">Score</th>
              <th style="width: 14%;">Rating</th>
            </tr>
          </thead>
          <tbody>
            ${(p5.harms || []).map(h => {
              const l = parseInt(h.likelihood, 10) || 1;
              const i = parseInt(h.impact, 10) || 1;
              const score = l * i;
              let rating = 'Low (🟢)';
              if (score > 16) rating = 'Critical (🔴)';
              else if (score > 9) rating = 'High (🟠)';
              else if (score > 4) rating = 'Medium (🟡)';
              return `
                <tr>
                  <td><strong>${escapeHtml(h.id)}</strong></td>
                  <td>${escapeHtml(h.description)}</td>
                  <td>${escapeHtml(h.who)}</td>
                  <td>${escapeHtml(h.dimension)}</td>
                  <td style="text-align:center;">${l}</td>
                  <td style="text-align:center;">${i}</td>
                  <td style="text-align:center;"><strong>${score}</strong></td>
                  <td><span class="${getScoreBadgeClass(score)}">${rating}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
        <div class="pr-field">
          <span class="pr-label">Systemic &amp; Compounding Risks</span>
          <div class="pr-value">${escapeHtml(p5.systemicRisks || 'N/A')}</div>
        </div>
        <div class="pr-grid-2">
          <div class="pr-field">
            <span class="pr-label">AI-to-AI / System Interactions</span>
            <div class="pr-value">${escapeHtml(p5.aiInteractions || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Decommissioning &amp; Transition Risks</span>
            <div class="pr-value">${escapeHtml(p5.postDecomRisks || 'N/A')}</div>
          </div>
        </div>
      </div>

      <!-- Part 6 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 6 — Risk Mitigation &amp; Treatment Plan (MANAGE 1.1 · MANAGE 2.1)</div>
        <span class="pr-label">Mitigation Controls &amp; Actions</span>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 10%;">Harm ID</th>
              <th style="width: 12%;">Response</th>
              <th>Mitigation Action / Control</th>
              <th style="width: 14%;">Owner</th>
              <th style="width: 12%;">Target Date</th>
              <th style="width: 12%;">Residual</th>
            </tr>
          </thead>
          <tbody>
            ${(p6.mitigations || []).map(m => `
              <tr>
                <td><strong>${escapeHtml(m.harmId)}</strong></td>
                <td>${escapeHtml(m.responseType)}</td>
                <td>${escapeHtml(m.action)}</td>
                <td>${escapeHtml(m.owner)}</td>
                <td>${escapeHtml(m.targetDate)}</td>
                <td><span class="${getLevelBadgeClass(m.residual)}">${escapeHtml(m.residual)}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        ${(p6.acceptedRisks && p6.acceptedRisks.length > 0) ? `
          <span class="pr-label" style="margin-top: 5pt;">Formally Accepted Residual Risks</span>
          <table class="pr-table">
            <thead>
              <tr>
                <th style="width: 10%;">Harm ID</th>
                <th style="width: 12%;">Residual Level</th>
                <th>Business Justification / Rationale</th>
                <th style="width: 16%;">Accepted By</th>
                <th style="width: 12%;">Date</th>
              </tr>
            </thead>
            <tbody>
              ${p6.acceptedRisks.map(a => `
                <tr>
                  <td><strong>${escapeHtml(a.harmId)}</strong></td>
                  <td><span class="${getLevelBadgeClass(a.residualLevel)}">${escapeHtml(a.residualLevel)}</span></td>
                  <td>${escapeHtml(a.rationale)}</td>
                  <td>${escapeHtml(a.acceptedBy)}</td>
                  <td>${escapeHtml(a.date)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}
      </div>

      <!-- Part 7 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 7 — Stakeholder Engagement &amp; Affected Communities (GOVERN 5.1 · MAP 1.5)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th>Stakeholder Group</th>
              <th>Type</th>
              <th>Method</th>
              <th>Date</th>
              <th>Key Concerns &amp; Actions Taken</th>
            </tr>
          </thead>
          <tbody>
            ${(p7.stakeholders || []).map(s => `
              <tr>
                <td><strong>${escapeHtml(s.group)}</strong></td>
                <td>${escapeHtml(s.type)}</td>
                <td>${escapeHtml(s.method)}</td>
                <td>${escapeHtml(s.date)}</td>
                <td>${escapeHtml(s.feedback)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="margin-top: 5pt;">
          <span class="pr-label">Engagement Quality Checks</span>
          <table class="pr-table">
            <thead>
              <tr>
                <th style="width: 35%;">Quality Criterion</th>
                <th style="width: 15%;">Met</th>
                <th>Audit Notes</th>
              </tr>
            </thead>
            <tbody>
              ${(p7.qualityChecks || []).map(q => `
                <tr>
                  <td><strong>${escapeHtml(q.criterion)}</strong></td>
                  <td>${escapeHtml(q.met)}</td>
                  <td>${escapeHtml(q.notes)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Part 8 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 8 — Testing, Evaluation, Verification &amp; Validation (MEASURE 1 · MEASURE 2)</div>
        <div class="pr-grid-2">
          <div class="pr-field">
            <span class="pr-label">TEVV Dossier Reference</span>
            <div class="pr-value">${escapeHtml(p8.tevvReference || 'N/A')}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Independent Validator</span>
            <div class="pr-value">${escapeHtml(p8.independentValidator || 'N/A')}</div>
          </div>
        </div>
        <span class="pr-label" style="margin-top: 4pt;">TEVV Activities</span>
        <table class="pr-table">
          <thead>
            <tr>
              <th>TEVV Activity</th>
              <th>Completed</th>
              <th>Date</th>
              <th>Conducted By</th>
              <th>Key Findings &amp; Observations</th>
            </tr>
          </thead>
          <tbody>
            ${(p8.tevvActivities || []).map(t => `
              <tr>
                <td><strong>${escapeHtml(t.activity)}</strong></td>
                <td>${escapeHtml(t.completed)}</td>
                <td>${escapeHtml(t.date)}</td>
                <td>${escapeHtml(t.conductedBy)}</td>
                <td>${escapeHtml(t.findings)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <span class="pr-label" style="margin-top: 5pt;">Key Performance &amp; Safety Thresholds</span>
        <table class="pr-table">
          <thead>
            <tr>
              <th>Evaluation Metric</th>
              <th>Target Threshold</th>
              <th>Actual Observed</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${(p8.metrics || []).map(m => `
              <tr>
                <td><strong>${escapeHtml(m.metric)}</strong></td>
                <td>${escapeHtml(m.threshold)}</td>
                <td>${escapeHtml(m.actual)}</td>
                <td><strong>${escapeHtml(m.result)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Part 10 -->
      <div class="pr-section">
        <div class="pr-section-title">Part 10 — Governance Sign-Off &amp; Approvals (GOVERN 4.2)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 20%;">Governance Role</th>
              <th style="width: 18%;">Signatory Name</th>
              <th style="width: 14%;">Decision</th>
              <th>Conditions / Notes</th>
              <th style="width: 10%;">Date</th>
              <th style="width: 16%;">Signature Stamp</th>
            </tr>
          </thead>
          <tbody>
            ${(p10.approvals || []).map(a => `
              <tr>
                <td><strong>${escapeHtml(a.role)}</strong></td>
                <td>${escapeHtml(a.name)}</td>
                <td><strong>${escapeHtml(a.decision)}</strong></td>
                <td>${escapeHtml(a.notes)}</td>
                <td>${escapeHtml(a.date)}</td>
                <td><code style="font-family: monospace; font-size: 7pt;">${escapeHtml(a.signature)}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="pr-footer">
          Official AI Impact Assessment Document · Generated by SamaBrains NIST AI RMF Studio · Operationalizing NIST AI RMF 1.0 · Assessment ID: ${escapeHtml(h.assessmentId)}
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  function triggerPrintPdf() {
    const data = serializeForm();
    renderPrintReport(data);

    // Save active theme & switch temporarily to light mode for printing
    const previousTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');

    showToast('Opening Executive Print / PDF dialog...');

    setTimeout(() => {
      window.print();
      // Restore theme after print dialog initiates
      setTimeout(() => {
        const savedTheme = localStorage.getItem('aiia_theme') || previousTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }, 500);
    }, 200);
  }

  window.addEventListener('afterprint', () => {
    const savedTheme = localStorage.getItem('aiia_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  });

  btnPrintPdf.addEventListener('click', triggerPrintPdf);
  btnPrintPdfBottom?.addEventListener('click', triggerPrintPdf);

  // Hash Navigation Listener
  window.addEventListener('hashchange', () => {
    const h = (window.location.hash || '').replace('#', '').toLowerCase();
    if (h === 'roles') switchHubView('roles', false);
    else if (h === 'assessment' || h === 'aiia') switchHubView('assessment', false);
    else if (h === 'inventory') switchHubView('inventory', false);
  });

  // Initial Load & State Restoration
  loadInventoryState();

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

  // Initial View Determination (URL Hash > Default to Inventory)
  const initialHash = (window.location.hash || '').replace('#', '').toLowerCase();
  if (initialHash === 'roles') {
    switchHubView('roles', false);
  } else if (initialHash === 'assessment' || initialHash === 'aiia') {
    switchHubView('assessment', false);
  } else {
    switchHubView('inventory', false);
  }
}

// Ensure execution whether loaded synchronously or after DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAntigravityGovernanceApp);
} else {
  initAntigravityGovernanceApp();
}
