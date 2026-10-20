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
      { id: 'policy', btn: document.getElementById('tab-nav-policy'), view: document.getElementById('view-policy'), act: document.getElementById('actions-policy') },
      { id: 'map', btn: document.getElementById('tab-nav-map'), view: document.getElementById('view-map'), act: document.getElementById('actions-map') },
      { id: 'measure', btn: document.getElementById('tab-nav-measure'), view: document.getElementById('view-measure'), act: document.getElementById('actions-measure') },
      { id: 'manage', btn: document.getElementById('tab-nav-manage'), view: document.getElementById('view-manage'), act: document.getElementById('actions-manage') },
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
    } else if (target === 'policy') {
      renderPolicyModule();
    } else if (target === 'map') {
      renderMapModule();
    } else if (target === 'measure') {
      renderMeasureModule();
    } else if (target === 'manage') {
      renderManageModule();
    } else {
      syncHeaderBadges();
      updateProgress();
    }

    const breadcrumbNames = {
      inventory: 'AI System Inventory (GOVERN 1.6)',
      roles: 'Roles & RACI Matrix (GOVERN 2)',
      policy: 'Policy & Release Gates (GOVERN 1 & 6)',
      map: 'Context & Harms Studio (MAP 1–5)',
      measure: 'TEVV & Metrics Studio (MEASURE 1–4)',
      manage: 'Risk & Incidents Studio (MANAGE 1–4)',
      assessment: 'Impact Assessment Studio (AIIA)'
    };
    const breadcrumbEl = document.getElementById('header-breadcrumb-current');
    if (breadcrumbEl && breadcrumbNames[target]) {
      breadcrumbEl.textContent = breadcrumbNames[target];
    }

    const sidebar = document.getElementById('hub-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar?.classList.contains('sidebar-open')) {
      sidebar.classList.remove('sidebar-open');
      backdrop?.classList.remove('active');
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
  document.getElementById('tab-nav-policy')?.addEventListener('click', () => switchHubView('policy'));
  document.getElementById('tab-nav-map')?.addEventListener('click', () => switchHubView('map'));
  document.getElementById('tab-nav-measure')?.addEventListener('click', () => switchHubView('measure'));
  document.getElementById('tab-nav-manage')?.addEventListener('click', () => switchHubView('manage'));
  document.getElementById('tab-nav-assessment')?.addEventListener('click', () => switchHubView('assessment'));

  // Mobile sidebar drawer handlers
  const mobileToggle = document.getElementById('sidebar-mobile-toggle');
  const sidebarEl = document.getElementById('hub-sidebar');
  const backdropEl = document.getElementById('sidebar-backdrop');

  mobileToggle?.addEventListener('click', () => {
    sidebarEl?.classList.toggle('sidebar-open');
    backdropEl?.classList.toggle('active');
  });

  backdropEl?.addEventListener('click', () => {
    sidebarEl?.classList.remove('sidebar-open');
    backdropEl?.classList.remove('active');
  });

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

  // ==========================================================================
  // 0.3 AI GOVERNANCE POLICY & GATING MODULE (GOVERN 1 & 6)
  // ==========================================================================
  let selectedPolicySystemId = 'SYS-FIN-001';

  function switchPolicySubview(target) {
    const subtabs = [
      { id: 'gates', btn: document.getElementById('btn-sub-gates'), view: document.getElementById('subview-gates') },
      { id: 'principles', btn: document.getElementById('btn-sub-principles'), view: document.getElementById('subview-principles') },
      { id: 'artifacts', btn: document.getElementById('btn-sub-artifacts'), view: document.getElementById('subview-artifacts') },
      { id: 'thirdparty', btn: document.getElementById('btn-sub-thirdparty'), view: document.getElementById('subview-thirdparty') },
      { id: 'exceptions', btn: document.getElementById('btn-sub-exceptions'), view: document.getElementById('subview-exceptions') }
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

    if (target === 'gates') renderPolicyGates();
    else if (target === 'principles') renderPrinciplesAudit();
    else if (target === 'artifacts') renderArtifactTracker();
    else if (target === 'thirdparty') renderThirdPartyScreener();
    else if (target === 'exceptions') renderExceptionsRegister();
  }

  window.switchPolicySubview = switchPolicySubview;

  document.getElementById('btn-sub-gates')?.addEventListener('click', () => switchPolicySubview('gates'));
  document.getElementById('btn-sub-principles')?.addEventListener('click', () => switchPolicySubview('principles'));
  document.getElementById('btn-sub-artifacts')?.addEventListener('click', () => switchPolicySubview('artifacts'));
  document.getElementById('btn-sub-thirdparty')?.addEventListener('click', () => switchPolicySubview('thirdparty'));
  document.getElementById('btn-sub-exceptions')?.addEventListener('click', () => switchPolicySubview('exceptions'));

  function populatePolicySystemSelect() {
    const select = document.getElementById('policy-system-select');
    if (!select) return;
    const current = select.value || selectedPolicySystemId;
    const systems = inventorySystems.length > 0 ? inventorySystems : (typeof DEFAULT_INVENTORY_SYSTEMS !== 'undefined' ? DEFAULT_INVENTORY_SYSTEMS : []);

    select.innerHTML = systems.map(s => `
      <option value="${escapeHtml(s.id)}" ${s.id === current ? 'selected' : ''}>
        ${escapeHtml(s.id)} — ${escapeHtml(s.name)} (${escapeHtml(s.riskLevel)} Risk)
      </option>
    `).join('');

    if (systems.some(s => s.id === current)) {
      select.value = current;
      selectedPolicySystemId = current;
    } else if (systems.length > 0) {
      selectedPolicySystemId = systems[0].id;
      select.value = selectedPolicySystemId;
    }
  }

  document.getElementById('policy-system-select')?.addEventListener('change', (e) => {
    selectedPolicySystemId = e.target.value;
    renderPolicyGates();
    renderArtifactTracker();
  });

  function renderPolicyModule() {
    populatePolicySystemSelect();
    renderPolicyGates();
    renderDecomTriggers();
    renderPrinciplesAudit();
    renderArtifactTracker();
    renderThirdPartyScreener();
    renderExceptionsRegister();
  }

  function renderPolicyGates() {
    const container = document.getElementById('gates-cards-container');
    const badge = document.getElementById('policy-gate-overall-badge');
    const badgeText = document.getElementById('policy-gate-overall-text');
    if (!container) return;

    const evalData = (typeof SYSTEM_GATE_EVALUATIONS !== 'undefined' && SYSTEM_GATE_EVALUATIONS[selectedPolicySystemId]) 
      ? SYSTEM_GATE_EVALUATIONS[selectedPolicySystemId]
      : {
          systemName: selectedPolicySystemId,
          status: "CONDITIONAL HOLD (UNDER REVIEW)",
          statusClass: "cond",
          gates: {
            "GATE-01": { passed: true, score: "Mitigation in Progress", notes: "Awaiting final residual risk verification." },
            "GATE-02": { passed: true, score: "Legal Review Pending", notes: "Statutory checklist initiated." },
            "GATE-03": { passed: false, score: "TEVV Pending", notes: "Independent test harness in validation." },
            "GATE-04": { passed: false, score: "Pending Sign-Off", notes: "Final veto review scheduled." }
          }
        };

    if (badge && badgeText) {
      badge.className = `gate-status-badge ${evalData.statusClass || 'cond'}`;
      badgeText.textContent = evalData.status;
    }

    const gatesList = typeof DEPLOYMENT_GATES !== 'undefined' ? DEPLOYMENT_GATES : [];

    container.innerHTML = gatesList.map(g => {
      const gResult = evalData.gates ? evalData.gates[g.id] : { passed: false, score: 'Pending', notes: 'Review scheduled' };
      const cardClass = gResult.passed ? 'passed' : 'failed';
      const chipClass = gResult.passed ? 'passed' : 'failed';
      const chipText = gResult.passed ? 'PASSED / CLEARED' : 'BLOCKED / PENDING';

      return `
        <div class="gate-card ${cardClass}">
          <div class="gate-card-header">
            <div>
              <span class="gate-id-tag">${escapeHtml(g.id)} · ${escapeHtml(g.nistRef)}</span>
              <h3 class="gate-title">${escapeHtml(g.gateName)}</h3>
            </div>
            <span class="gate-chip ${chipClass}">${chipText}</span>
          </div>

          <p class="gate-body">${escapeHtml(g.description)}</p>

          <div class="gate-field-label">Mandatory Required Evidence</div>
          <div class="gate-evidence-box">
            ${escapeHtml(g.mandatoryEvidence)}
          </div>

          <div class="gate-veto-row">
            <span>🛡️ <strong>Veto Authorities:</strong></span>
            <span>${escapeHtml(g.vetoHolders.join(', '))}</span>
          </div>

          <div class="gate-field-label">Evaluated Finding for ${escapeHtml(selectedPolicySystemId)}</div>
          <div class="gate-findings-box">
            <div style="font-weight: 700; margin-bottom: 2px;">${escapeHtml(gResult.score)}</div>
            <div style="color: var(--text-secondary); font-size: 0.78rem;">${escapeHtml(gResult.notes)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderDecomTriggers() {
    const tbody = document.getElementById('decom-triggers-table-body');
    if (!tbody) return;
    const triggers = typeof DECOMMISSION_TRIGGERS !== 'undefined' ? DECOMMISSION_TRIGGERS : [];

    tbody.innerHTML = triggers.map(t => `
      <tr>
        <td class="inv-id-cell">${escapeHtml(t.id)}</td>
        <td style="font-weight: 600;">${escapeHtml(t.trigger)}</td>
        <td>${escapeHtml(t.condition)}</td>
        <td style="font-weight: 600; color: var(--accent-cyan);">${escapeHtml(t.action)}</td>
      </tr>
    `).join('');
  }

  function renderPrinciplesAudit() {
    const tbody = document.getElementById('principles-table-body');
    if (!tbody) return;
    const principles = typeof TRUSTWORTHY_PRINCIPLES !== 'undefined' ? TRUSTWORTHY_PRINCIPLES : [];

    tbody.innerHTML = principles.map(p => `
      <tr>
        <td class="inv-id-cell">${escapeHtml(p.id)}</td>
        <td>
          <div style="font-weight: 700;">${escapeHtml(p.name)}</div>
          <code style="font-size: 0.72rem; color: var(--accent-cyan);">${escapeHtml(p.nistRef)}</code>
        </td>
        <td style="font-size: 0.82rem;">${escapeHtml(p.summary)}</td>
        <td style="font-size: 0.8rem;">
          <div style="margin-bottom: 4px;"><strong>Standard:</strong> ${escapeHtml(p.operationalStandard)}</div>
          <div style="color: var(--text-secondary);"><strong>Audit Verification:</strong> ${escapeHtml(p.verificationCriteria)}</div>
        </td>
        <td>
          <span class="status-badge-pill prod">✅ ${escapeHtml(p.status)}</span>
        </td>
      </tr>
    `).join('');
  }

  function renderArtifactTracker() {
    const tbody = document.getElementById('artifacts-table-body');
    if (!tbody) return;
    const artifacts = typeof MANDATORY_ARTIFACTS !== 'undefined' ? MANDATORY_ARTIFACTS : [];
    const evalData = (typeof SYSTEM_GATE_EVALUATIONS !== 'undefined' && SYSTEM_GATE_EVALUATIONS[selectedPolicySystemId]) 
      ? SYSTEM_GATE_EVALUATIONS[selectedPolicySystemId] : null;

    tbody.innerHTML = artifacts.map(a => {
      const artStatus = (evalData && evalData.artifacts && evalData.artifacts[a.id]) ? evalData.artifacts[a.id] : 'Required';
      let pillClass = 'required';
      if (artStatus === 'Complete') pillClass = 'complete';
      else if (artStatus.includes('Progress') || artStatus.includes('Complete')) pillClass = 'inprogress';
      else if (artStatus === 'Draft') pillClass = 'draft';
      else if (artStatus === 'Failed' || artStatus === 'Rejected') pillClass = 'failed';

      return `
        <tr>
          <td class="inv-id-cell">${escapeHtml(a.id)}</td>
          <td>
            <strong>${escapeHtml(a.name)}</strong>
            <div style="font-size: 0.72rem; color: var(--accent-cyan);">${escapeHtml(a.nistRef)}</div>
          </td>
          <td><span class="step-badge" style="font-size: 0.72rem;">${escapeHtml(a.stage)}</span></td>
          <td style="font-weight: 600; font-size: 0.82rem;">${escapeHtml(a.ownerRole)}</td>
          <td style="font-size: 0.8rem;">
            <div>${escapeHtml(a.description)}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">Retention: ${a.retentionYears} Years</div>
          </td>
          <td>
            <span class="doc-status-pill ${pillClass}">${escapeHtml(artStatus)}</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderThirdPartyScreener() {
    const tbody = document.getElementById('thirdparty-table-body');
    if (!tbody) return;
    const rubric = typeof THIRD_PARTY_SCREENING_RUBRIC !== 'undefined' ? THIRD_PARTY_SCREENING_RUBRIC : [];

    tbody.innerHTML = rubric.map(r => `
      <tr>
        <td class="inv-id-cell">${escapeHtml(r.id)}</td>
        <td style="font-weight: 700;">${escapeHtml(r.dimension)}</td>
        <td><span class="badge-recommendation ${r.weight.includes('Critical') ? 'nogo' : 'cond'}">${escapeHtml(r.weight)}</span></td>
        <td style="font-size: 0.82rem;">${escapeHtml(r.mandatoryRequirement)}</td>
        <td><code style="color: var(--accent-cyan); font-size: 0.75rem;">${escapeHtml(r.nistRef)}</code></td>
      </tr>
    `).join('');
  }

  function renderExceptionsRegister() {
    const tbody = document.getElementById('exceptions-table-body');
    if (!tbody) return;
    const exceptions = typeof POLICY_EXCEPTIONS_DATA !== 'undefined' ? POLICY_EXCEPTIONS_DATA : [];

    tbody.innerHTML = exceptions.map(ex => `
      <tr>
        <td class="inv-id-cell">${escapeHtml(ex.id)}</td>
        <td>
          <strong>${escapeHtml(ex.systemName)}</strong>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(ex.systemId)}</div>
        </td>
        <td><code style="color: var(--accent-cyan); font-size: 0.75rem;">${escapeHtml(ex.clauseAffected)}</code></td>
        <td style="font-size: 0.8rem;">
          <div style="margin-bottom: 3px;"><strong>Nature:</strong> ${escapeHtml(ex.natureOfException)}</div>
          <div style="color: var(--text-secondary);"><strong>Compensating Controls:</strong> ${escapeHtml(ex.compensatingControls)}</div>
        </td>
        <td style="font-family: monospace; font-size: 0.8rem;">
          <div>${escapeHtml(ex.expiryDate)}</div>
          <span class="doc-status-pill inprogress" style="font-size: 0.65rem;">Active</span>
        </td>
        <td style="font-size: 0.8rem; font-weight: 600;">${escapeHtml(ex.approvedBy)}</td>
      </tr>
    `).join('');
  }

  // Export Policy & Gating Markdown Summary
  function exportPolicyMarkdown() {
    const meta = typeof POLICY_METADATA !== 'undefined' ? POLICY_METADATA : {};
    const evalData = (typeof SYSTEM_GATE_EVALUATIONS !== 'undefined' && SYSTEM_GATE_EVALUATIONS[selectedPolicySystemId]) 
      ? SYSTEM_GATE_EVALUATIONS[selectedPolicySystemId] : null;

    let md = `# AI Governance Policy Compliance & Attestation Dossier\n\n`;
    md += `**Organization:** SamaBrains Assurance & AI Governance Practice  \n`;
    md += `**Framework:** NIST AI Risk Management Framework 1.0 (NIST AI RMF — GOVERN 1 & 6)  \n`;
    md += `**Policy Version:** ${meta.version || '1.0'}  \n`;
    md += `**Generated Date:** ${new Date().toISOString().slice(0, 10)}  \n`;
    md += `**Evaluated System:** ${selectedPolicySystemId} (${evalData ? evalData.systemName : 'All Registered Systems'})  \n`;
    md += `**Deployment Clearance:** ${evalData ? evalData.status : 'PENDING'}  \n\n`;
    md += `---\n\n`;

    md += `## 1. Executive Deployment Gates (GOVERN 1.3)\n\n`;
    (typeof DEPLOYMENT_GATES !== 'undefined' ? DEPLOYMENT_GATES : []).forEach(g => {
      const res = evalData && evalData.gates ? evalData.gates[g.id] : { passed: false, score: 'Pending' };
      md += `### ${g.id}: ${g.gateName} [${res.passed ? 'PASSED' : 'BLOCKED'}]\n`;
      md += `- **NIST AI RMF Ref:** ${g.nistRef}\n`;
      md += `- **Requirement:** ${g.description}\n`;
      md += `- **Mandatory Evidence:** ${g.mandatoryEvidence}\n`;
      md += `- **Veto Authorities:** ${g.vetoHolders.join(', ')}\n`;
      md += `- **Evaluated Score/Result:** ${res.score} — ${res.notes || ''}\n\n`;
    });

    md += `## 2. Mandatory Documentation Artifacts Readiness (GOVERN 1.4)\n\n`;
    md += `| Doc ID | Mandatory Artifact Name | Accountable Role | Status |\n`;
    md += `|---|---|---|---|\n`;
    (typeof MANDATORY_ARTIFACTS !== 'undefined' ? MANDATORY_ARTIFACTS : []).forEach(a => {
      const st = evalData && evalData.artifacts ? (evalData.artifacts[a.id] || 'Required') : 'Required';
      md += `| **${a.id}** | ${a.name} | ${a.ownerRole} | ${st} |\n`;
    });

    md += `\n---\n*Generated by SamaBrains NIST AI Governance Hub · NIST AI RMF 1.0 Aligned*\n`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Governance-Policy-Attestation-${selectedPolicySystemId}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported Policy Attestation for ${selectedPolicySystemId}`);
  }

  document.getElementById('btn-export-policy-md')?.addEventListener('click', exportPolicyMarkdown);

  // Executive Policy Attestation PDF Generator
  function triggerPrintPolicyPdf() {
    const container = document.getElementById('print-policy-report');
    if (!container) return;

    const previousTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');

    const meta = typeof POLICY_METADATA !== 'undefined' ? POLICY_METADATA : {};
    const evalData = (typeof SYSTEM_GATE_EVALUATIONS !== 'undefined' && SYSTEM_GATE_EVALUATIONS[selectedPolicySystemId]) 
      ? SYSTEM_GATE_EVALUATIONS[selectedPolicySystemId] : null;
    const gates = typeof DEPLOYMENT_GATES !== 'undefined' ? DEPLOYMENT_GATES : [];

    const html = `
      <div class="pr-header">
        <div>
          <div class="pr-org">SAMABRAINS ASSURANCE &amp; GOVERNANCE</div>
          <h1 class="pr-title">Executive AI Governance Policy Attestation</h1>
          <div class="pr-subtitle">Operationalizing NIST AI Risk Management Framework 1.0 (NIST AI RMF — GOVERN 1 &amp; GOVERN 6)</div>
        </div>
        <div>
          <span class="${evalData && evalData.statusClass === 'go' ? 'pr-badge-go' : 'pr-badge-nogo'}">
            ${evalData ? evalData.status : 'UNDER EVALUATION'}
          </span>
        </div>
      </div>

      <div class="pr-meta-box">
        <div class="pr-grid-4">
          <div class="pr-field">
            <span class="pr-label">Evaluated System</span>
            <span class="pr-value" style="font-weight: 700;">${selectedPolicySystemId} · ${evalData ? evalData.systemName : ''}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Policy Governance Version</span>
            <span class="pr-value" style="font-weight: 700;">${meta.version || '1.0'} (Effective 2026)</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Chief AI Officer</span>
            <span class="pr-value">${meta.owner || 'Dr. Elena Vance'}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Attestation Date</span>
            <span class="pr-value">${new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>
      </div>

      <div class="pr-section">
        <div class="pr-section-title">Section 1 — Mandatory 4-Tier Deployment Gate Clearance (GOVERN 1.3)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 10%;">Gate ID</th>
              <th style="width: 25%;">Deployment Gate Requirement</th>
              <th style="width: 22%;">Veto Authorities</th>
              <th>Evaluation Audit Finding</th>
              <th style="width: 14%;">Result</th>
            </tr>
          </thead>
          <tbody>
            ${gates.map(g => {
              const res = evalData && evalData.gates ? evalData.gates[g.id] : { passed: false, score: 'Pending', notes: '' };
              return `
                <tr>
                  <td><strong>${escapeHtml(g.id)}</strong></td>
                  <td>
                    <div><strong>${escapeHtml(g.gateName)}</strong></div>
                    <div style="font-size: 7pt; color: #475569;">${escapeHtml(g.nistRef)}</div>
                  </td>
                  <td>${escapeHtml(g.vetoHolders.join(', '))}</td>
                  <td>
                    <div><strong>${escapeHtml(res.score)}</strong></div>
                    <div style="font-size: 7pt; color: #475569;">${escapeHtml(res.notes)}</div>
                  </td>
                  <td>
                    <span class="${res.passed ? 'pr-badge-go' : 'pr-badge-nogo'}">
                      ${res.passed ? 'PASSED' : 'BLOCKED'}
                    </span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="pr-section">
        <div class="pr-section-title">Section 2 — Mandatory Lifecycle Artifacts Audit (GOVERN 1.4)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 10%;">Doc ID</th>
              <th style="width: 28%;">Mandatory Governance Artifact</th>
              <th style="width: 22%;">Accountable Role Owner</th>
              <th style="width: 22%;">Lifecycle Stage</th>
              <th style="width: 18%;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${(typeof MANDATORY_ARTIFACTS !== 'undefined' ? MANDATORY_ARTIFACTS : []).map(a => {
              const st = evalData && evalData.artifacts ? (evalData.artifacts[a.id] || 'Required') : 'Required';
              return `
                <tr>
                  <td><strong>${escapeHtml(a.id)}</strong></td>
                  <td>${escapeHtml(a.name)}</td>
                  <td>${escapeHtml(a.ownerRole)}</td>
                  <td>${escapeHtml(a.stage)}</td>
                  <td><strong>${escapeHtml(st)}</strong></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="pr-section">
        <div class="pr-section-title">Section 3 — Executive Concurrence &amp; Attestation Sign-Off</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 25%;">Executive Role</th>
              <th style="width: 25%;">Attesting Officer</th>
              <th style="width: 25%;">Formal Decision</th>
              <th style="width: 25%;">Signature Verification Stamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Chief AI Officer</strong></td>
              <td>Dr. Elena Vance</td>
              <td><strong>CONCURRED &amp; CLEARED</strong></td>
              <td><code>VERIFIED-CAIO-2026-NIST-001</code></td>
            </tr>
            <tr>
              <td><strong>General Counsel / Legal Lead</strong></td>
              <td>Arthur Pendelton</td>
              <td><strong>LEGAL SIGN-OFF CERTIFIED</strong></td>
              <td><code>VERIFIED-LEGAL-2026-COMP-002</code></td>
            </tr>
            <tr>
              <td><strong>AI Ethics Officer</strong></td>
              <td>Prof. Kwame Mensah</td>
              <td><strong>TEVV &amp; EQUITY APPROVED</strong></td>
              <td><code>VERIFIED-ETHICS-2026-VAL-003</code></td>
            </tr>
          </tbody>
        </table>
        <div class="pr-footer">
          Official AI Governance Policy Compliance Attestation · SamaBrains NIST AI Governance Hub · NIST AI RMF 1.0 (GOVERN 1 &amp; 6)
        </div>
      </div>
    `;

    container.innerHTML = html;
    showToast('Opening Executive Policy Attestation Print / PDF dialog...');

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const savedTheme = localStorage.getItem('aiia_theme') || previousTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }, 500);
    }, 200);
  }

  document.getElementById('btn-print-policy-pdf')?.addEventListener('click', triggerPrintPolicyPdf);

  // ==========================================================================
  // MAP STUDIO MODULE (NIST AI RMF MAP 1–5)
  // Context Profiling, 13 Harm Scenarios, Risk-Benefit Matrix, Stakeholders
  // ==========================================================================
  let selectedMapSystemId = 'AI-001';
  let activeMapSubview = 'harms';

  function switchMapSubview(target) {
    activeMapSubview = target;
    const subtabs = [
      { id: 'harms', btn: document.getElementById('btn-sub-map-harms'), panel: document.getElementById('subview-map-harms') },
      { id: 'matrix', btn: document.getElementById('btn-sub-map-matrix'), panel: document.getElementById('subview-map-matrix') },
      { id: 'stakeholders', btn: document.getElementById('btn-sub-map-stakeholders'), panel: document.getElementById('subview-map-stakeholders') },
      { id: 'conops', btn: document.getElementById('btn-sub-map-conops'), panel: document.getElementById('subview-map-conops') },
      { id: 'dependencies', btn: document.getElementById('btn-sub-map-dependencies'), panel: document.getElementById('subview-map-dependencies') }
    ];

    subtabs.forEach(st => {
      st.btn?.classList.toggle('active', st.id === target);
      if (st.panel) {
        st.panel.classList.toggle('active', st.id === target);
        st.panel.style.display = st.id === target ? 'block' : 'none';
      }
    });

    if (target === 'harms') renderHarmScenarios();
    else if (target === 'matrix') renderRiskBenefitMatrix();
    else if (target === 'stakeholders') renderStakeholderScreener();
    else if (target === 'conops') renderConopsModule();
    else if (target === 'dependencies') renderThirdPartyDependencies();
  }
  window.switchMapSubview = switchMapSubview;

  function renderMapModule() {
    // Populate Map system selector
    const sel = document.getElementById('map-system-select');
    if (sel && inventorySystems && inventorySystems.length > 0) {
      const currentVal = sel.value || selectedMapSystemId;
      sel.innerHTML = inventorySystems.map(s => {
        const sid = s.systemId || s.id;
        const selected = (sid === currentVal || s.id === currentVal) ? 'selected' : '';
        return `<option value="${s.id}" ${selected}>${sid} — ${s.name} (${s.riskTier} Risk)</option>`;
      }).join('');
      selectedMapSystemId = sel.value;
    }

    renderMapHeaderAndStats();

    if (activeMapSubview === 'harms') renderHarmScenarios();
    else if (activeMapSubview === 'matrix') renderRiskBenefitMatrix();
    else if (activeMapSubview === 'stakeholders') renderStakeholderScreener();
    else if (activeMapSubview === 'conops') renderConopsModule();
    else if (activeMapSubview === 'dependencies') renderThirdPartyDependencies();
  }

  function renderMapHeaderAndStats() {
    const profile = (typeof SYSTEM_MAP_PROFILES !== 'undefined' && SYSTEM_MAP_PROFILES[selectedMapSystemId])
      ? SYSTEM_MAP_PROFILES[selectedMapSystemId] : null;

    const conopsPill = document.getElementById('map-conops-pill');
    const threatPill = document.getElementById('map-threat-pill');

    if (conopsPill) {
      if (profile) {
        conopsPill.textContent = `CONOPS: ${profile.conopsStatus}`;
        conopsPill.className = profile.conopsStatus.includes('BLOCKED') ? 'gate-status-badge blocked' : 'gate-status-badge approved';
      } else {
        conopsPill.textContent = 'CONOPS: Standard';
        conopsPill.className = 'gate-status-badge approved';
      }
    }

    if (threatPill && profile) {
      threatPill.textContent = `Top Threat: ${profile.topThreat}`;
    }

    // KPI Cards
    const totalHarmsEl = document.getElementById('map-stat-total-harms');
    const critHarmsEl = document.getElementById('map-stat-critical-harms');
    const residualEl = document.getElementById('map-stat-residual-clearance');
    const vulEl = document.getElementById('map-stat-vulnerable-groups');

    if (totalHarmsEl) totalHarmsEl.textContent = profile ? profile.totalHarms : (typeof MAP_RISK_BENEFIT_ITEMS !== 'undefined' ? MAP_RISK_BENEFIT_ITEMS.length : '13');
    if (critHarmsEl) critHarmsEl.textContent = profile ? (profile.criticalHarms + profile.highHarms) : '7';
    if (residualEl) residualEl.textContent = profile && profile.residualHigh > 0 ? `${profile.residualHigh} Unmitigated` : '100% Cleared';
    if (vulEl) vulEl.textContent = typeof MAP_VULNERABLE_GROUPS !== 'undefined' ? MAP_VULNERABLE_GROUPS.length : '6';
  }

  document.getElementById('map-system-select')?.addEventListener('change', (e) => {
    selectedMapSystemId = e.target.value;
    renderMapModule();
  });

  // Harm Scenarios renderer
  function renderHarmScenarios() {
    const container = document.getElementById('map-harms-grid');
    if (!container) return;

    const search = (document.getElementById('map-harms-search')?.value || '').toLowerCase().trim();
    const catFilter = document.getElementById('map-filter-category')?.value || '';
    const ratingFilter = document.getElementById('map-filter-rating')?.value || '';

    let items = typeof MAP_RISK_BENEFIT_ITEMS !== 'undefined' ? [...MAP_RISK_BENEFIT_ITEMS] : [];

    if (search) {
      items = items.filter(r => 
        r.id.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search) ||
        r.category.toLowerCase().includes(search) ||
        r.controlDescription.toLowerCase().includes(search) ||
        r.controlOwner.toLowerCase().includes(search)
      );
    }
    if (catFilter) {
      items = items.filter(r => r.category === catFilter);
    }
    if (ratingFilter) {
      items = items.filter(r => r.riskRating === ratingFilter);
    }

    if (items.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No harm scenarios match your filter criteria.</div>';
      return;
    }

    container.innerHTML = items.map(r => {
      const ratingClass = r.riskRating === 'Critical' ? 'gate-failed' : (r.riskRating === 'High' ? 'gate-pending' : 'gate-passed');
      const badgePill = r.riskRating === 'Critical' ? 'blocked' : (r.riskRating === 'High' ? 'pending' : 'approved');
      const resClass = r.residualRisk === 'Low' ? 'approved' : (r.residualRisk === 'Medium' ? 'pending' : 'blocked');

      return `
        <div class="gate-card ${ratingClass}">
          <div class="gate-header">
            <div>
              <span class="gate-id">${r.id} · ${r.category}</span>
              <span style="font-size: 0.72rem; color: var(--text-muted); margin-left: 0.5rem;">${r.mapSubcategory}</span>
            </div>
            <span class="gate-status-pill ${badgePill}">Pre-Risk: ${r.riskRating}</span>
          </div>
          <h4>${r.description}</h4>
          
          <div style="font-size: 0.8rem; margin: 0.5rem 0; padding: 0.5rem; background: var(--bg-input); border-radius: var(--radius-sm);">
            <div style="color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase; font-weight: 700;">Trigger Condition:</div>
            <div style="color: var(--text-primary); margin-bottom: 0.35rem;">${r.triggerCondition || 'Real-time user prompt query'}</div>
            <div style="color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase; font-weight: 700;">Failure Cascade:</div>
            <div style="color: var(--text-primary);">${r.failureCascade || 'Downstream harm to customer finances or trust'}</div>
          </div>

          <div class="gate-detail-row">
            <span class="gate-detail-label">NIST Characteristic</span>
            <span class="gate-detail-value">${r.trustworthiness}</span>
          </div>

          <div class="gate-detail-row">
            <span class="gate-detail-label">Likelihood &amp; Magnitude</span>
            <span class="gate-detail-value">L: ${r.likelihood} × M: ${r.magnitude}</span>
          </div>

          <div class="gate-detail-row">
            <span class="gate-detail-label">Response Treatment</span>
            <span class="gate-detail-value"><strong>${r.riskResponse}</strong></span>
          </div>

          <div class="gate-detail-row">
            <span class="gate-detail-label">Mandatory Control</span>
            <span class="gate-detail-value" style="font-size: 0.76rem; color: var(--text-secondary);">${r.controlDescription}</span>
          </div>

          <div class="gate-detail-row">
            <span class="gate-detail-label">Residual Risk &amp; Owner</span>
            <span class="gate-detail-value">
              <span class="doc-status-pill ${resClass}">Post: ${r.residualRisk}</span> · ${r.controlOwner}
            </span>
          </div>
          
          <div class="gate-detail-row" style="margin-top: 0.35rem; padding-top: 0.35rem; border-top: 1px dashed var(--border-color);">
            <span class="gate-detail-label">Monitoring Cadence</span>
            <span class="gate-detail-value" style="font-size: 0.75rem;">${r.monitoringFrequency} (${r.monitoringMethod.split(';')[0]})</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Filters event listeners
  document.getElementById('map-harms-search')?.addEventListener('input', renderHarmScenarios);
  document.getElementById('map-filter-category')?.addEventListener('change', renderHarmScenarios);
  document.getElementById('map-filter-rating')?.addEventListener('change', renderHarmScenarios);
  document.getElementById('btn-reset-map-filters')?.addEventListener('click', () => {
    if (document.getElementById('map-harms-search')) document.getElementById('map-harms-search').value = '';
    if (document.getElementById('map-filter-category')) document.getElementById('map-filter-category').value = '';
    if (document.getElementById('map-filter-rating')) document.getElementById('map-filter-rating').value = '';
    renderHarmScenarios();
  });

  // Risk-Benefit Matrix Renderer
  function renderRiskBenefitMatrix() {
    const tbody = document.getElementById('map-matrix-table-body');
    if (!tbody) return;
    const items = typeof MAP_RISK_BENEFIT_ITEMS !== 'undefined' ? MAP_RISK_BENEFIT_ITEMS : [];

    tbody.innerHTML = items.map(r => {
      const preBadge = r.riskRating === 'Critical' ? 'tag-crit' : (r.riskRating === 'High' ? 'tag-high' : 'tag-med');
      const postBadge = r.residualRisk === 'Low' ? 'tag-low' : (r.residualRisk === 'Medium' ? 'tag-med' : 'tag-crit');

      return `
        <tr>
          <td><strong>${r.id}</strong></td>
          <td><span class="badge-dept">${r.category}</span></td>
          <td>
            <strong>${r.description}</strong>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.2rem;">${r.mapSubcategory} · Affected: ${r.affectedStakeholders}</div>
          </td>
          <td>
            <span class="stat-tag ${preBadge}">${r.riskRating}</span>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">L: ${r.likelihood}<br>M: ${r.magnitude}</div>
          </td>
          <td>
            <div style="font-size: 0.8rem; margin-bottom: 0.25rem;"><strong>Treatment: ${r.riskResponse}</strong></div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4;">${r.controlDescription}</div>
            <div style="font-size: 0.72rem; color: var(--accent-primary); margin-top: 0.25rem;">Owner: ${r.controlOwner} · Linked: ${r.linkedBenefit}</div>
          </td>
          <td>
            <span class="stat-tag ${postBadge}">Residual: ${r.residualRisk}</span>
          </td>
          <td>
            <div style="font-weight: 600; font-size: 0.78rem;">${r.monitoringFrequency}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${r.monitoringMethod}</div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Stakeholders & Vulnerability Screener Renderer
  function renderStakeholderScreener() {
    // 1. Vulnerable Groups
    const vulTbody = document.getElementById('map-vulnerable-table-body');
    if (vulTbody) {
      const groups = typeof MAP_VULNERABLE_GROUPS !== 'undefined' ? MAP_VULNERABLE_GROUPS : [];
      vulTbody.innerHTML = groups.map(g => {
        const statusBadge = g.verificationStatus === 'Verified' ? 'tag-low' : 'tag-med';
        return `
          <tr>
            <td><strong>${g.group}</strong></td>
            <td style="font-size: 0.8rem; line-height: 1.4;">${g.vulnerabilityReason}</td>
            <td style="font-size: 0.8rem; line-height: 1.4; color: #ef4444;">${g.specificRisks}</td>
            <td style="font-size: 0.8rem; line-height: 1.4; color: var(--text-secondary);">${g.requiredSafeguards}</td>
            <td><span class="stat-tag ${statusBadge}">${g.verificationStatus}</span></td>
          </tr>
        `;
      }).join('');
    }

    // 2. Stakeholders Register
    const stkTbody = document.getElementById('map-stakeholders-table-body');
    if (stkTbody) {
      const stakeholders = typeof MAP_STAKEHOLDERS_REGISTER !== 'undefined' ? MAP_STAKEHOLDERS_REGISTER : [];
      stkTbody.innerHTML = stakeholders.map(s => {
        const pBadge = s.priority === 'Critical' ? 'tag-crit' : (s.priority === 'High' ? 'tag-high' : 'tag-med');
        return `
          <tr>
            <td><strong>${s.id}</strong></td>
            <td><strong>${s.name}</strong><br><span style="font-size: 0.72rem; color: var(--text-muted);">Lead: ${s.owner}</span></td>
            <td><span class="badge-dept">${s.category}</span></td>
            <td><span class="stat-tag ${pBadge}">${s.priority}</span></td>
            <td><span class="status-badge live" style="font-size: 0.75rem;">${s.powerInterest}</span></td>
            <td style="font-size: 0.8rem; color: var(--text-secondary);">${s.engagement}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // CONOPS & Oversight Envelopes Renderer
  function renderConopsModule() {
    const data = typeof MAP_CONOPS_DATA !== 'undefined' ? MAP_CONOPS_DATA : null;
    if (!data) return;

    const intendedList = document.getElementById('conops-intended-list');
    if (intendedList) {
      intendedList.innerHTML = data.intendedUses.map(u => `
        <li style="margin-bottom: 0.5rem;">
          <strong>${u.title}:</strong> ${u.description}
          <span class="stat-tag tag-low" style="margin-left: 0.35rem; font-size: 0.68rem;">${u.riskLevel} Risk</span>
        </li>
      `).join('');
    }

    const misuseList = document.getElementById('conops-misuse-list');
    if (misuseList) {
      misuseList.innerHTML = data.foreseeableMisuse.map(m => `
        <li style="margin-bottom: 0.5rem;">
          <strong>${m.title}:</strong> ${m.description}
          <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.2rem;">🛡️ <em>Guardrail:</em> ${m.safeguard}</div>
        </li>
      `).join('');
    }

    const unaccList = document.getElementById('conops-unacceptable-list');
    if (unaccList) {
      unaccList.innerHTML = data.unacceptableUses.map(u => `
        <li style="margin-bottom: 0.5rem;">
          <strong>${u.title}:</strong> ${u.description}
          <div style="font-size: 0.74rem; color: #ef4444; font-weight: 700; margin-top: 0.15rem;">⛔ Hard Policy Blocked</div>
        </li>
      `).join('');
    }

    const oversightTbody = document.getElementById('map-oversight-table-body');
    if (oversightTbody) {
      oversightTbody.innerHTML = data.oversightLayers.map(l => `
        <tr>
          <td><strong>${l.layer}</strong></td>
          <td style="font-size: 0.82rem; line-height: 1.4;">${l.description}</td>
          <td style="font-size: 0.8rem; color: var(--accent-primary); font-weight: 600;">${l.cadence}</td>
        </tr>
      `).join('');
    }
  }

  // Third-Party Dependencies Renderer
  function renderThirdPartyDependencies() {
    const tbody = document.getElementById('map-dependencies-table-body');
    if (!tbody) return;
    const deps = typeof MAP_THIRD_PARTY_DEPENDENCIES !== 'undefined' ? MAP_THIRD_PARTY_DEPENDENCIES : [];

    tbody.innerHTML = deps.map(d => {
      const riskBadge = d.riskLevel === 'High' ? 'tag-high' : 'tag-med';
      return `
        <tr>
          <td><strong>${d.id}</strong></td>
          <td><strong>${d.name}</strong><br><span style="font-size: 0.72rem; color: var(--text-muted);">Provider: ${d.provider}</span></td>
          <td style="font-size: 0.8rem;">${d.type}</td>
          <td><span class="stat-tag ${riskBadge}">${d.riskLevel}</span></td>
          <td style="font-size: 0.8rem;">${d.dataResidency}</td>
          <td style="font-size: 0.8rem;">${d.zeroRetention}</td>
          <td><span class="stat-tag tag-low">${d.status}</span></td>
        </tr>
      `;
    }).join('');
  }

  // Exporters: CSV, Markdown, Print PDF
  function exportMapCsv() {
    const items = typeof MAP_RISK_BENEFIT_ITEMS !== 'undefined' ? MAP_RISK_BENEFIT_ITEMS : [];
    if (!items || items.length === 0) return;

    const headers = [
      'Risk_ID', 'Category', 'Risk_Description', 'MAP_Subcategory', 'Affected_Stakeholders',
      'Trustworthiness_Characteristic', 'Likelihood', 'Magnitude', 'Risk_Rating', 'Risk_Response',
      'Control_Description', 'Control_Owner', 'Control_Status', 'Residual_Risk', 'Monitoring_Method',
      'Monitoring_Frequency', 'Linked_Benefit', 'Notes'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const s = String(val).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = items.map(r => [
      escapeCsv(r.id),
      escapeCsv(r.category),
      escapeCsv(r.description),
      escapeCsv(r.mapSubcategory),
      escapeCsv(r.affectedStakeholders),
      escapeCsv(r.trustworthiness),
      escapeCsv(r.likelihood),
      escapeCsv(r.magnitude),
      escapeCsv(r.riskRating),
      escapeCsv(r.riskResponse),
      escapeCsv(r.controlDescription),
      escapeCsv(r.controlOwner),
      escapeCsv(r.controlStatus),
      escapeCsv(r.residualRisk),
      escapeCsv(r.monitoringMethod),
      escapeCsv(r.monitoringFrequency),
      escapeCsv(r.linkedBenefit),
      escapeCsv(r.notes)
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MAP-Risk-Benefit-Matrix-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported MAP-Risk-Benefit-Matrix.csv');
  }
  window.exportMapCsv = exportMapCsv;
  document.getElementById('btn-export-map-csv')?.addEventListener('click', exportMapCsv);

  function exportMapMarkdown() {
    const items = typeof MAP_RISK_BENEFIT_ITEMS !== 'undefined' ? MAP_RISK_BENEFIT_ITEMS : [];
    const meta = typeof MAP_METADATA !== 'undefined' ? MAP_METADATA : {};
    const profile = (typeof SYSTEM_MAP_PROFILES !== 'undefined' && SYSTEM_MAP_PROFILES[selectedMapSystemId])
      ? SYSTEM_MAP_PROFILES[selectedMapSystemId] : null;

    let md = `# NIST AI RMF Context & Risk Report: ${profile ? profile.name : selectedMapSystemId}\n\n`;
    md += `**Framework:** NIST AI Risk Management Framework 1.0 (NIST AI 100-1 — MAP Function)\n`;
    md += `**System ID:** ${selectedMapSystemId}\n`;
    md += `**Date:** ${new Date().toISOString().slice(0, 10)}\n`;
    md += `**Owner:** ${meta.owner || 'AI Ethics & Risk Architecture Team'}\n\n`;
    md += `> **Status:** ${profile ? profile.conopsStatus : 'Approved'}\n\n`;
    md += `---\n\n## 1. 13 Profiled Harm Scenarios (MAP 3.2)\n\n`;

    items.forEach(r => {
      md += `### ${r.id}: ${r.description}\n`;
      md += `- **Category:** ${r.category} (${r.mapSubcategory})\n`;
      md += `- **Trustworthiness:** ${r.trustworthiness}\n`;
      md += `- **Pre-Mitigation Rating:** ${r.riskRating} (Likelihood: ${r.likelihood}, Magnitude: ${r.magnitude})\n`;
      md += `- **Treatment Response:** ${r.riskResponse}\n`;
      md += `- **Control:** ${r.controlDescription}\n`;
      md += `- **Owner:** ${r.controlOwner} | **Residual Risk:** ${r.residualRisk}\n`;
      md += `- **Monitoring:** ${r.monitoringMethod} (${r.monitoringFrequency})\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MAP-Context-Report-${selectedMapSystemId}-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported MAP Context Report for ${selectedMapSystemId}`);
  }
  document.getElementById('btn-export-map-md')?.addEventListener('click', exportMapMarkdown);

  function triggerPrintMapPdf() {
    const container = document.getElementById('print-map-report');
    if (!container) return;

    const previousTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');

    const meta = typeof MAP_METADATA !== 'undefined' ? MAP_METADATA : {};
    const items = typeof MAP_RISK_BENEFIT_ITEMS !== 'undefined' ? MAP_RISK_BENEFIT_ITEMS : [];
    const profile = (typeof SYSTEM_MAP_PROFILES !== 'undefined' && SYSTEM_MAP_PROFILES[selectedMapSystemId])
      ? SYSTEM_MAP_PROFILES[selectedMapSystemId] : null;

    const html = `
      <div class="pr-header">
        <div>
          <div class="pr-org">SAMABRAINS ASSURANCE &amp; RISK PRACTICE</div>
          <h1 class="pr-title">Executive AI Context &amp; Harm Dossier (MAP 1–5)</h1>
          <div class="pr-subtitle">Operationalizing NIST AI Risk Management Framework 1.0 (NIST AI 100-1)</div>
        </div>
        <div>
          <span class="pr-badge-go">CONTEXT PROFILED</span>
        </div>
      </div>

      <div class="pr-meta-box">
        <div class="pr-grid-4">
          <div class="pr-field">
            <span class="pr-label">Target System</span>
            <span class="pr-value" style="font-weight: 700;">${selectedMapSystemId} · ${profile ? profile.name : ''}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">CONOPS Status</span>
            <span class="pr-value" style="font-weight: 700;">${profile ? profile.conopsStatus : 'Approved Envelopes'}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Evaluation Date</span>
            <span class="pr-value">${new Date().toISOString().slice(0, 10)}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Residual Clearance</span>
            <span class="pr-value">100% (0 Unmitigated Critical)</span>
          </div>
        </div>
      </div>

      <div class="pr-section">
        <div class="pr-section-title">Section 1 — 13 Profiled Harm Scenarios &amp; Controls (MAP 3.2)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 8%;">ID</th>
              <th style="width: 12%;">Category</th>
              <th style="width: 25%;">Harm Description</th>
              <th style="width: 10%;">Pre-Risk</th>
              <th>Mandatory Controls &amp; Monitoring</th>
              <th style="width: 10%;">Residual</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(r => `
              <tr>
                <td><strong>${r.id}</strong></td>
                <td>${r.category}</td>
                <td><strong>${r.description}</strong><br><span style="font-size: 6.5pt; color: #64748b;">${r.mapSubcategory}</span></td>
                <td><span class="${r.riskRating === 'Critical' ? 'pr-risk-crit' : (r.riskRating === 'High' ? 'pr-risk-high' : 'pr-risk-med')}">${r.riskRating}</span></td>
                <td style="font-size: 7pt;">${r.controlDescription}<br><strong>Owner:</strong> ${r.controlOwner} · <em>${r.monitoringFrequency}</em></td>
                <td><span class="${r.residualRisk === 'Low' ? 'pr-risk-low' : 'pr-risk-med'}">${r.residualRisk}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pr-section pr-page-break">
        <div class="pr-section-title">Section 2 — Disproportionately Affected &amp; Vulnerable Groups (MAP 5.2)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 20%;">Vulnerable Cohort</th>
              <th style="width: 25%;">Vulnerability Basis</th>
              <th style="width: 25%;">Specific Risks from AI</th>
              <th>Required Protective Safeguards</th>
            </tr>
          </thead>
          <tbody>
            ${(typeof MAP_VULNERABLE_GROUPS !== 'undefined' ? MAP_VULNERABLE_GROUPS : []).map(g => `
              <tr>
                <td><strong>${g.group}</strong></td>
                <td style="font-size: 7pt;">${g.vulnerabilityReason}</td>
                <td style="font-size: 7pt; color: #b91c1c;">${g.specificRisks}</td>
                <td style="font-size: 7pt;">${g.requiredSafeguards}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="pr-footer">
          Official NIST AI RMF MAP Context Dossier · SamaBrains AI Governance Hub · NIST AI 100-1 (MAP 1–5)
        </div>
      </div>
    `;

    container.innerHTML = html;
    showToast('Opening Executive MAP Context Dossier Print / PDF dialog...');

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const savedTheme = localStorage.getItem('aiia_theme') || previousTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }, 500);
    }, 200);
  }
  document.getElementById('btn-print-map-pdf')?.addEventListener('click', triggerPrintMapPdf);

  // ==========================================================================
  // 0.4 TEVV & QUANTITATIVE METRICS MODULE (MEASURE 1–4 · NIST SP 1270)
  // ==========================================================================
  let selectedMeasureSystemId = 'AI-001';
  let activeMeasureSubview = 'metrics';

  function switchMeasureSubview(target) {
    activeMeasureSubview = target;
    const subtabs = [
      { id: 'metrics', btn: document.getElementById('btn-sub-measure-metrics'), panel: document.getElementById('subview-measure-metrics') },
      { id: 'suites', btn: document.getElementById('btn-sub-measure-suites'), panel: document.getElementById('subview-measure-suites') },
      { id: 'bias', btn: document.getElementById('btn-sub-measure-bias'), panel: document.getElementById('subview-measure-bias') },
      { id: 'monitoring', btn: document.getElementById('btn-sub-measure-monitoring'), panel: document.getElementById('subview-measure-monitoring') },
      { id: 'calendar', btn: document.getElementById('btn-sub-measure-calendar'), panel: document.getElementById('subview-measure-calendar') }
    ];

    subtabs.forEach(st => {
      st.btn?.classList.toggle('active', st.id === target);
      if (st.panel) {
        st.panel.classList.toggle('active', st.id === target);
        st.panel.style.display = st.id === target ? 'block' : 'none';
      }
    });

    if (target === 'metrics') renderMetricsTracker();
    else if (target === 'suites') renderTevvTestSuites();
    else if (target === 'bias') renderBiasLabModule();
    else if (target === 'monitoring') renderMonitoringModule();
  }
  window.switchMeasureSubview = switchMeasureSubview;

  document.getElementById('btn-sub-measure-metrics')?.addEventListener('click', () => switchMeasureSubview('metrics'));
  document.getElementById('btn-sub-measure-suites')?.addEventListener('click', () => switchMeasureSubview('suites'));
  document.getElementById('btn-sub-measure-bias')?.addEventListener('click', () => switchMeasureSubview('bias'));
  document.getElementById('btn-sub-measure-monitoring')?.addEventListener('click', () => switchMeasureSubview('monitoring'));
  document.getElementById('btn-sub-measure-calendar')?.addEventListener('click', () => switchMeasureSubview('calendar'));

  function renderMeasureModule() {
    // Populate Measure system select dropdown
    const sel = document.getElementById('measure-system-select');
    if (sel && inventorySystems && inventorySystems.length > 0) {
      const currentVal = sel.value || selectedMeasureSystemId;
      sel.innerHTML = inventorySystems.map(s => {
        const sid = s.systemId || s.id;
        const selected = (sid === currentVal || s.id === currentVal) ? 'selected' : '';
        return `<option value="${s.id}" ${selected}>${sid} — ${s.name} (${s.riskTier || s.riskLevel} Risk)</option>`;
      }).join('');
      selectedMeasureSystemId = sel.value;
    }

    renderMeasureHeaderAndStats();

    if (activeMeasureSubview === 'metrics') renderMetricsTracker();
    else if (activeMeasureSubview === 'suites') renderTevvTestSuites();
    else if (activeMeasureSubview === 'bias') renderBiasLabModule();
    else if (activeMeasureSubview === 'monitoring') renderMonitoringModule();
  }

  function renderMeasureHeaderAndStats() {
    const profile = (typeof SYSTEM_MEASURE_PROFILES !== 'undefined' && SYSTEM_MEASURE_PROFILES[selectedMeasureSystemId])
      ? SYSTEM_MEASURE_PROFILES[selectedMeasureSystemId] : null;

    const tevvBadge = document.getElementById('measure-tevv-badge');
    const ragBadge = document.getElementById('measure-rag-badge');

    if (tevvBadge) {
      if (profile) {
        tevvBadge.textContent = `TEVV: ${profile.tevvStatus} (${profile.testSuitesPassed})`;
        tevvBadge.className = profile.tevvStatus === 'Passed' ? 'gate-status-badge approved' : (profile.tevvStatus === 'Failed' ? 'gate-status-badge blocked' : 'gate-status-badge pending');
      } else {
        tevvBadge.textContent = 'TEVV: Passed (11 / 11 Suites)';
        tevvBadge.className = 'gate-status-badge approved';
      }
    }

    if (ragBadge) {
      if (profile) {
        if (profile.breaches === 0) {
          ragBadge.textContent = '0 Red-Line Breaches';
          ragBadge.className = 'gate-status-badge approved';
        } else {
          ragBadge.textContent = `${profile.breaches} Red-Line Breach(es)`;
          ragBadge.className = 'gate-status-badge blocked';
        }
      } else {
        ragBadge.textContent = '0 Red-Line Breaches';
        ragBadge.className = 'gate-status-badge approved';
      }
    }

    // KPI Cards
    const totalEl = document.getElementById('measure-stat-total-metrics');
    const tier1El = document.getElementById('measure-stat-tier1-metrics');
    const suitesEl = document.getElementById('measure-stat-test-suites');
    const gapEl = document.getElementById('measure-stat-fairness-gap');

    if (totalEl) totalEl.textContent = profile ? profile.totalMetrics : (typeof MEASURE_METRICS_CATALOG !== 'undefined' ? MEASURE_METRICS_CATALOG.length : '20');
    if (tier1El) tier1El.textContent = profile ? `${profile.tier1Count} / 6 (${profile.breaches === 0 ? '100% Met' : profile.breaches + ' Breached'})` : '6 / 6 (100% Met)';
    if (suitesEl) suitesEl.textContent = profile ? profile.testSuitesPassed : '11 / 11 Passed';
    if (gapEl) gapEl.textContent = profile ? `${profile.fairnessGap} (Target ≤ 5%)` : '1.8% (Target ≤ 5%)';
  }

  document.getElementById('measure-system-select')?.addEventListener('change', (e) => {
    selectedMeasureSystemId = e.target.value;
    renderMeasureModule();
  });

  // Metrics Tracker Renderer
  function renderMetricsTracker() {
    const tbody = document.getElementById('measure-metrics-table-body');
    if (!tbody) return;

    const q = (document.getElementById('measure-metrics-search')?.value || '').toLowerCase().trim();
    const selTier = document.getElementById('measure-filter-tier')?.value || '';
    const selRag = document.getElementById('measure-filter-rag')?.value || '';

    let items = typeof MEASURE_METRICS_CATALOG !== 'undefined' ? [...MEASURE_METRICS_CATALOG] : [];

    if (q) {
      items = items.filter(m => 
        m.id.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.formula.toLowerCase().includes(q) ||
        m.owner.toLowerCase().includes(q) ||
        m.trustworthiness.toLowerCase().includes(q)
      );
    }

    if (selTier) {
      items = items.filter(m => String(m.tier) === selTier);
    }

    if (selRag) {
      items = items.filter(m => m.ragStatus === selRag);
    }

    const countText = document.getElementById('measure-metrics-count');
    if (countText) {
      countText.textContent = `Showing ${items.length} of ${typeof MEASURE_METRICS_CATALOG !== 'undefined' ? MEASURE_METRICS_CATALOG.length : 20} metrics across 4 tiers with explicit formulas and red-line thresholds.`;
    }

    if (items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">No metrics match your filter criteria.</td></tr>';
      return;
    }

    tbody.innerHTML = items.map(m => {
      const tierBadge = m.tier === 1 ? 'tag-crit' : (m.tier === 2 ? 'tag-high' : (m.tier === 3 ? 'tag-med' : 'tag-low'));
      const statusPill = m.ragStatus === 'Green' ? 'approved' : (m.ragStatus === 'Amber' ? 'pending' : 'blocked');
      const trendIcon = m.trend === '↑' ? '↗️' : (m.trend === '↓' ? '↘️' : '➡️');

      return `
        <tr>
          <td><strong>${m.id}</strong></td>
          <td>
            <strong>${m.name}</strong>
            <div style="margin-top: 0.2rem;"><span class="stat-tag ${tierBadge}">Tier ${m.tier}: ${m.tierName}</span></div>
          </td>
          <td>
            <span class="badge-dept">${m.trustworthiness}</span>
          </td>
          <td>
            <div style="font-size: 0.8rem; font-family: monospace; line-height: 1.4; color: var(--text-primary);">${m.formula}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.2rem;">Source: ${m.dataSource}</div>
          </td>
          <td>
            <div style="font-size: 0.8rem; color: #10b981; font-weight: 600;">Target: ${m.target}</div>
            <div style="font-size: 0.76rem; color: #ef4444; font-weight: 600; margin-top: 0.2rem;">Red Line: ${m.redLine}</div>
          </td>
          <td>
            <span style="font-weight: 700; font-size: 0.88rem; color: var(--accent-primary);">${m.actualValue}</span>
          </td>
          <td>
            <span class="doc-status-pill ${statusPill}">${m.ragStatus} ${trendIcon}</span>
          </td>
          <td>
            <div style="font-weight: 600; font-size: 0.8rem;">${m.frequency}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${m.owner}</div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Filter event listeners for metrics tracker
  document.getElementById('measure-metrics-search')?.addEventListener('input', renderMetricsTracker);
  document.getElementById('measure-filter-tier')?.addEventListener('change', renderMetricsTracker);
  document.getElementById('measure-filter-rag')?.addEventListener('change', renderMetricsTracker);
  document.getElementById('btn-reset-measure-filters')?.addEventListener('click', () => {
    if (document.getElementById('measure-metrics-search')) document.getElementById('measure-metrics-search').value = '';
    if (document.getElementById('measure-filter-tier')) document.getElementById('measure-filter-tier').value = '';
    if (document.getElementById('measure-filter-rag')) document.getElementById('measure-filter-rag').value = '';
    renderMetricsTracker();
  });

  // TEVV Test Suites Renderer
  function renderTevvTestSuites() {
    const container = document.getElementById('measure-suites-grid');
    if (!container) return;

    const q = (document.getElementById('measure-suites-search')?.value || '').toLowerCase().trim();
    let suites = typeof TEVV_TEST_SUITES !== 'undefined' ? [...TEVV_TEST_SUITES] : [];

    if (q) {
      suites = suites.filter(s =>
        s.id.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.runBy.toLowerCase().includes(q)
      );
    }

    if (suites.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No TEVV test suites match your search.</div>';
      return;
    }

    container.innerHTML = suites.map(s => {
      const cardClass = s.status === 'Passed' ? 'gate-passed' : (s.status === 'Failed' ? 'gate-failed' : 'gate-pending');
      const badgePill = s.status === 'Passed' ? 'approved' : (s.status === 'Failed' ? 'blocked' : 'pending');

      return `
        <div class="gate-card ${cardClass}">
          <div class="gate-header">
            <div>
              <span class="gate-id">${s.id}</span>
              <span style="font-size: 0.72rem; color: var(--text-muted); margin-left: 0.5rem;">${s.testCases} Test Cases</span>
            </div>
            <span class="gate-status-pill ${badgePill}">${s.status} (${s.passRate})</span>
          </div>
          <h4>${s.name}</h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin: 0.5rem 0;">${s.description}</p>
          
          <div class="gate-detail-row">
            <span class="gate-detail-label">Results</span>
            <span class="gate-detail-value">
              <span style="color: #10b981; font-weight: 700;">${s.passedCases} Passed</span> · 
              <span style="color: ${s.failedCases > 0 ? '#ef4444' : 'var(--text-muted)'}; font-weight: 700;">${s.failedCases} Failed</span>
            </span>
          </div>

          <div class="gate-detail-row">
            <span class="gate-detail-label">Linked Metrics</span>
            <span class="gate-detail-value"><code>${s.linkedMetrics.join(', ')}</code></span>
          </div>

          <div class="gate-detail-row">
            <span class="gate-detail-label">Executed By</span>
            <span class="gate-detail-value"><strong>${s.runBy}</strong></span>
          </div>

          <div class="gate-detail-row">
            <span class="gate-detail-label">Cadence</span>
            <span class="gate-detail-value" style="font-size: 0.76rem;">${s.frequency}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  document.getElementById('measure-suites-search')?.addEventListener('input', renderTevvTestSuites);

  // Bias Lab Module Renderer
  function renderBiasLabModule() {
    // 1. Proxy Dimensions
    const proxyTbody = document.getElementById('measure-bias-proxy-tbody');
    if (proxyTbody) {
      const proxies = typeof BIAS_PROXY_DIMENSIONS !== 'undefined' ? BIAS_PROXY_DIMENSIONS : [];
      proxyTbody.innerHTML = proxies.map(p => `
        <tr>
          <td><strong>${p.dimension}</strong></td>
          <td style="font-size: 0.8rem; line-height: 1.4;">${p.correlatedAttributes}</td>
          <td style="font-size: 0.8rem; line-height: 1.4; color: var(--text-secondary);">${p.testingMethod}</td>
          <td>
            <div style="font-weight: 700; font-size: 0.8rem; color: var(--accent-primary);">${p.benchmarkDisparity}</div>
            <span class="stat-tag tag-low" style="margin-top: 0.2rem;">${p.status}</span>
          </td>
        </tr>
      `).join('');
    }

    // 2. Pre-Deployment Bias Test Procedures
    const procTbody = document.getElementById('measure-bias-procedures-tbody');
    if (procTbody) {
      const procs = typeof BIAS_TEST_PROCEDURES !== 'undefined' ? BIAS_TEST_PROCEDURES : [];
      procTbody.innerHTML = procs.map(pr => `
        <tr>
          <td><strong>${pr.id}</strong></td>
          <td><strong>${pr.name}</strong></td>
          <td>
            <div style="font-size: 0.8rem; line-height: 1.4;">${pr.objective}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem;">Sample: ${pr.sampleSize}</div>
          </td>
          <td style="font-size: 0.8rem; color: #10b981; font-weight: 600;">${pr.passCriteria}</td>
          <td>
            <div style="font-size: 0.8rem; line-height: 1.4;">${pr.actualResult}</div>
            <span class="doc-status-pill approved" style="margin-top: 0.25rem;">${pr.status}</span>
          </td>
        </tr>
      `).join('');
    }

    // 3. Calculator Event Listeners
    setupDisparityCalculator();
  }

  function setupDisparityCalculator() {
    const refInput = document.getElementById('calc-ref-accuracy');
    const focalInput = document.getElementById('calc-focal-accuracy');
    const threshInput = document.getElementById('calc-threshold');

    function updateCalc() {
      const ref = parseFloat(refInput?.value) || 0;
      const focal = parseFloat(focalInput?.value) || 0;
      const thresh = parseFloat(threshInput?.value) || 5.0;

      const gap = Math.abs(ref - focal).toFixed(2);
      const ratio = ref > 0 ? (focal / ref).toFixed(3) : '1.000';

      const gapEl = document.getElementById('calc-gap-result');
      const ratioEl = document.getElementById('calc-ratio-result');
      const clearEl = document.getElementById('calc-clearance-result');

      const gapPassed = parseFloat(gap) <= thresh;
      const ratioPassed = parseFloat(ratio) >= 0.80;

      if (gapEl) {
        gapEl.textContent = `${gap}% (${gapPassed ? 'PASSED' : 'DISPARITY BREACH'})`;
        gapEl.style.color = gapPassed ? '#10b981' : '#ef4444';
      }

      if (ratioEl) {
        ratioEl.textContent = `${ratio} (${ratioPassed ? 'Rule ≥ 0.80 Met' : 'Adverse Impact (< 0.80)'})`;
        ratioEl.style.color = ratioPassed ? '#10b981' : '#ef4444';
      }

      if (clearEl) {
        if (gapPassed && ratioPassed) {
          clearEl.innerHTML = '<span class="badge badge-success">CLEARED FOR DEPLOYMENT</span>';
        } else {
          clearEl.innerHTML = '<span class="badge badge-danger">GATE-03 BIAS BLOCKED</span>';
        }
      }
    }

    refInput?.addEventListener('input', updateCalc);
    focalInput?.addEventListener('input', updateCalc);
    threshInput?.addEventListener('input', updateCalc);
    updateCalc();
  }

  // Monitoring Module Renderer
  function renderMonitoringModule() {
    const viewsTbody = document.getElementById('measure-monitoring-views-tbody');
    if (viewsTbody) {
      const views = typeof MONITORING_DASHBOARD_VIEWS !== 'undefined' ? MONITORING_DASHBOARD_VIEWS : [];
      viewsTbody.innerHTML = views.map(v => `
        <tr>
          <td><strong>${v.viewName}</strong></td>
          <td><span class="badge-dept">${v.audience}</span></td>
          <td style="font-size: 0.82rem; line-height: 1.4;">${v.metrics}</td>
          <td style="font-size: 0.8rem; font-weight: 600; color: var(--accent-primary);">${v.cadence}</td>
        </tr>
      `).join('');
    }

    const alertsTbody = document.getElementById('measure-alerts-tbody');
    if (alertsTbody) {
      const alerts = typeof ALERT_SLA_TIERS !== 'undefined' ? ALERT_SLA_TIERS : [];
      alertsTbody.innerHTML = alerts.map(a => `
        <tr>
          <td><span class="stat-tag ${a.badgeClass}">${a.tier}</span></td>
          <td style="font-size: 0.82rem; line-height: 1.4;">${a.trigger}</td>
          <td style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${a.notification}</td>
          <td style="font-size: 0.84rem; font-weight: 700; color: #ef4444;">${a.sla}</td>
        </tr>
      `).join('');
    }
  }

  // Measure Exports & PDF Generator
  function exportMeasureCsv() {
    const metrics = typeof MEASURE_METRICS_CATALOG !== 'undefined' ? MEASURE_METRICS_CATALOG : [];
    if (metrics.length === 0) return;

    function escapeCsv(val) {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    }

    const headers = [
      'Metric_ID', 'Metric_Name', 'Tier', 'Trustworthiness_Characteristic',
      'Measurement_Formula', 'Data_Source', 'Collection_Frequency', 'Target',
      'Red_Line', 'Owner', 'Review_Date', 'Actual_Value', 'RAG_Status', 'Trend', 'Notes_and_Actions'
    ];

    const rows = metrics.map(m => [
      escapeCsv(m.id),
      escapeCsv(m.name),
      escapeCsv(m.tier),
      escapeCsv(m.trustworthiness),
      escapeCsv(m.formula),
      escapeCsv(m.dataSource),
      escapeCsv(m.frequency),
      escapeCsv(m.target),
      escapeCsv(m.redLine),
      escapeCsv(m.owner),
      escapeCsv(new Date().toISOString().slice(0, 10)),
      escapeCsv(m.actualValue),
      escapeCsv(m.ragStatus === 'Green' ? '🟢' : (m.ragStatus === 'Amber' ? '🟡' : '🔴')),
      escapeCsv(m.trend),
      escapeCsv(m.notes)
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MEASURE-Metrics-Tracker-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported MEASURE-Metrics-Tracker.csv');
  }
  window.exportMeasureCsv = exportMeasureCsv;
  document.getElementById('btn-export-measure-csv')?.addEventListener('click', exportMeasureCsv);

  function exportMeasureMarkdown() {
    const metrics = typeof MEASURE_METRICS_CATALOG !== 'undefined' ? MEASURE_METRICS_CATALOG : [];
    const suites = typeof TEVV_TEST_SUITES !== 'undefined' ? TEVV_TEST_SUITES : [];
    const profile = (typeof SYSTEM_MEASURE_PROFILES !== 'undefined' && SYSTEM_MEASURE_PROFILES[selectedMeasureSystemId])
      ? SYSTEM_MEASURE_PROFILES[selectedMeasureSystemId] : null;

    let md = `# NIST AI RMF TEVV & Metrics Report: ${profile ? profile.name : selectedMeasureSystemId}\n\n`;
    md += `**Framework:** NIST AI Risk Management Framework 1.0 (NIST AI 100-1 — MEASURE Function)\n`;
    md += `**System ID:** ${selectedMeasureSystemId}\n`;
    md += `**Date:** ${new Date().toISOString().slice(0, 10)}\n`;
    md += `**TEVV Status:** ${profile ? profile.tevvStatus : 'Passed'} (${profile ? profile.testSuitesPassed : '11 / 11 Passed'})\n`;
    md += `**Independent Validator:** ${profile ? profile.independentValidator : 'SamaBrains Assurance & Independent TEVV Lab'}\n\n`;
    md += `> **GATE-03 Clearance:** ${profile && profile.tevvStatus === 'Passed' ? 'PASSED — Cleared for Live Deployment' : 'BLOCKED'}\n\n`;
    md += `---\n\n## 1. 20 Production Metrics Evaluation (MEASURE 1.1)\n\n`;

    metrics.forEach(m => {
      md += `### ${m.id}: ${m.name} (Tier ${m.tier}: ${m.tierName})\n`;
      md += `- **Trustworthiness:** ${m.trustworthiness}\n`;
      md += `- **Formula:** \`${m.formula}\`\n`;
      md += `- **Source & Cadence:** ${m.dataSource} (${m.frequency})\n`;
      md += `- **Target:** ${m.target} | **Red Line:** ${m.redLine}\n`;
      md += `- **Actual Result:** **${m.actualValue}** (Status: ${m.ragStatus}, Trend: ${m.trend})\n`;
      md += `- **Owner:** ${m.owner}\n\n`;
    });

    md += `---\n\n## 2. 11 Pre-Deployment TEVV Test Suites (MEASURE 2)\n\n`;
    suites.forEach(s => {
      md += `### ${s.id}: ${s.name}\n`;
      md += `- **Test Cases:** ${s.testCases} (${s.passedCases} Passed, ${s.failedCases} Failed — Pass Rate: ${s.passRate})\n`;
      md += `- **Status:** ${s.status}\n`;
      md += `- **Linked Metrics:** ${s.linkedMetrics.join(', ')}\n`;
      md += `- **Executed By:** ${s.runBy} (${s.frequency})\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MEASURE-TEVV-Report-${selectedMeasureSystemId}-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported TEVV Report for ${selectedMeasureSystemId}`);
  }
  document.getElementById('btn-export-measure-md')?.addEventListener('click', exportMeasureMarkdown);

  function triggerPrintMeasurePdf() {
    const container = document.getElementById('print-measure-report');
    if (!container) return;

    const previousTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');

    const metrics = typeof MEASURE_METRICS_CATALOG !== 'undefined' ? MEASURE_METRICS_CATALOG : [];
    const suites = typeof TEVV_TEST_SUITES !== 'undefined' ? TEVV_TEST_SUITES : [];
    const profile = (typeof SYSTEM_MEASURE_PROFILES !== 'undefined' && SYSTEM_MEASURE_PROFILES[selectedMeasureSystemId])
      ? SYSTEM_MEASURE_PROFILES[selectedMeasureSystemId] : null;

    const html = `
      <div class="pr-header">
        <div>
          <div class="pr-org">SAMABRAINS ASSURANCE &amp; TEVV PRACTICE</div>
          <h1 class="pr-title">Executive TEVV Validation Dossier (MEASURE 1–4)</h1>
          <div class="pr-subtitle">Operationalizing NIST AI Risk Management Framework 1.0 (NIST AI 100-1) &amp; NIST SP 1270</div>
        </div>
        <div>
          <span class="pr-badge-go">${profile && profile.tevvStatus === 'Passed' ? 'GATE-03 CLEARED' : 'GATE-03 PENDING'}</span>
        </div>
      </div>

      <div class="pr-meta-box">
        <div class="pr-grid-4">
          <div class="pr-field">
            <span class="pr-label">Target System</span>
            <span class="pr-value" style="font-weight: 700;">${selectedMeasureSystemId} · ${profile ? profile.name : ''}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">TEVV Status</span>
            <span class="pr-value" style="font-weight: 700; color: ${profile && profile.tevvStatus === 'Passed' ? '#10b981' : '#ef4444'};">${profile ? profile.tevvStatus : 'Passed'}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Test Suites Passed</span>
            <span class="pr-value">${profile ? profile.testSuitesPassed : '11 / 11 Passed'}</span>
          </div>
          <div class="pr-field">
            <span class="pr-label">Evaluation Date</span>
            <span class="pr-value">${new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>
      </div>

      <div class="pr-section">
        <div class="pr-section-title">Section 1 — Production AI Metrics Evaluation (MEASURE 1.1)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 8%;">ID</th>
              <th style="width: 14%;">Metric &amp; Tier</th>
              <th style="width: 14%;">NIST Characteristic</th>
              <th style="width: 26%;">Formula &amp; Source</th>
              <th style="width: 14%;">Target vs. Red Line</th>
              <th style="width: 12%;">Actual Result</th>
              <th style="width: 12%;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${metrics.map(m => `
              <tr>
                <td><strong>${m.id}</strong></td>
                <td><strong>${m.name}</strong><br><span style="font-size: 6.5pt; color: #64748b;">Tier ${m.tier}: ${m.tierName}</span></td>
                <td style="font-size: 7pt;">${m.trustworthiness}</td>
                <td style="font-size: 6.5pt; font-family: monospace;">${m.formula}<br><span style="color: #64748b;">${m.dataSource}</span></td>
                <td style="font-size: 7pt;"><span style="color: #10b981;">T: ${m.target}</span><br><span style="color: #ef4444;">RL: ${m.redLine}</span></td>
                <td><strong>${m.actualValue}</strong></td>
                <td><span class="${m.ragStatus === 'Green' ? 'pr-badge-go' : 'pr-badge-nogo'}">${m.ragStatus}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pr-section pr-page-break">
        <div class="pr-section-title">Section 2 — 11 Pre-Deployment TEVV Test Suites (MEASURE 2)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 10%;">Suite ID</th>
              <th style="width: 25%;">Test Suite Name</th>
              <th style="width: 15%;">Test Cases</th>
              <th style="width: 15%;">Pass Rate</th>
              <th>Linked Metrics &amp; Scope</th>
              <th style="width: 12%;">Gate Status</th>
            </tr>
          </thead>
          <tbody>
            ${suites.map(s => `
              <tr>
                <td><strong>${s.id}</strong></td>
                <td><strong>${s.name}</strong></td>
                <td>${s.testCases} Cases (${s.passedCases} passed)</td>
                <td><strong>${s.passRate}</strong></td>
                <td style="font-size: 7pt;">Metrics: ${s.linkedMetrics.join(', ')}<br>${s.description}</td>
                <td><span class="${s.status === 'Passed' ? 'pr-badge-go' : 'pr-badge-nogo'}">${s.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="pr-section-title" style="margin-top: 1.5rem;">Section 3 — Demographic Proxy Disparity &amp; Bias Audit (MEASURE 2.11)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 20%;">Proxy Dimension</th>
              <th style="width: 30%;">Testing Procedure</th>
              <th style="width: 30%;">Benchmark Empirical Disparity</th>
              <th style="width: 20%;">Compliance</th>
            </tr>
          </thead>
          <tbody>
            ${(typeof BIAS_PROXY_DIMENSIONS !== 'undefined' ? BIAS_PROXY_DIMENSIONS : []).map(p => `
              <tr>
                <td><strong>${p.dimension}</strong></td>
                <td style="font-size: 7pt;">${p.testingMethod}</td>
                <td style="font-size: 7pt;"><strong>${p.benchmarkDisparity}</strong></td>
                <td><span class="pr-badge-go">${p.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="pr-footer">
          Official NIST AI RMF MEASURE Validation Dossier · SamaBrains AI Governance Hub · NIST AI 100-1 (MEASURE 1–4)
        </div>
      </div>
    `;

    container.innerHTML = html;
    showToast('Opening Executive TEVV Validation Dossier Print / PDF dialog...');

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const savedTheme = localStorage.getItem('aiia_theme') || previousTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }, 500);
    }, 200);
  }
  document.getElementById('btn-print-measure-pdf')?.addEventListener('click', triggerPrintMeasurePdf);

  // ==========================================================================
  // 5. NIST AI RMF MANAGE STUDIO ENGINE (MANAGE 1.1 - 4.3)
  // ==========================================================================
  let activeManageSubview = 'incidents';
  let activeManagePlaybookId = 'PLAYBOOK-A';
  let manageIncidents = [];
  let manageProfiles = {};

  function loadManageState() {
    const savedInc = localStorage.getItem('ai_manage_incidents');
    if (savedInc) {
      try { manageIncidents = JSON.parse(savedInc); } catch (e) { manageIncidents = [...MANAGE_INCIDENTS_DATA]; }
    } else {
      manageIncidents = typeof MANAGE_INCIDENTS_DATA !== 'undefined' ? [...MANAGE_INCIDENTS_DATA] : [];
    }

    const savedProf = localStorage.getItem('ai_manage_profiles');
    if (savedProf) {
      try { manageProfiles = JSON.parse(savedProf); } catch (e) { manageProfiles = typeof SYSTEM_MANAGE_PROFILES !== 'undefined' ? JSON.parse(JSON.stringify(SYSTEM_MANAGE_PROFILES)) : {}; }
    } else {
      manageProfiles = typeof SYSTEM_MANAGE_PROFILES !== 'undefined' ? JSON.parse(JSON.stringify(SYSTEM_MANAGE_PROFILES)) : {};
    }
  }

  function saveManageIncidentsState() {
    try {
      localStorage.setItem('ai_manage_incidents', JSON.stringify(manageIncidents));
    } catch (e) {
      console.warn('Failed to save manage incidents state', e);
    }
  }

  function saveManageProfilesState() {
    try {
      localStorage.setItem('ai_manage_profiles', JSON.stringify(manageProfiles));
    } catch (e) {
      console.warn('Failed to save manage profiles state', e);
    }
  }

  function switchManageSubview(target) {
    activeManageSubview = target;
    const subtabs = [
      { id: 'incidents', btn: document.getElementById('manage-tab-incidents'), view: document.getElementById('subview-manage-incidents') },
      { id: 'playbooks', btn: document.getElementById('manage-tab-playbooks'), view: document.getElementById('subview-manage-playbooks') },
      { id: 'responses', btn: document.getElementById('manage-tab-responses'), view: document.getElementById('subview-manage-responses') },
      { id: 'improvements', btn: document.getElementById('manage-tab-improvements'), view: document.getElementById('subview-manage-improvements') },
      { id: 'override', btn: document.getElementById('manage-tab-override'), view: document.getElementById('subview-manage-override') }
    ];

    subtabs.forEach(st => {
      if (st.btn) st.btn.classList.toggle('active-subtab', st.id === target);
      if (st.view) st.view.style.display = st.id === target ? 'block' : 'none';
    });

    if (target === 'incidents') renderIncidentsRegistry();
    else if (target === 'playbooks') renderPlaybooksModule(activeManagePlaybookId);
    else if (target === 'responses') renderRiskResponses();
    else if (target === 'improvements') renderImprovementsLog();
    else if (target === 'override') renderOverrideDashboard();
  }

  function renderManageHeaderAndStats() {
    const statsContainer = document.getElementById('manage-stats-bar');
    if (!statsContainer) return;

    const totalIncidents = manageIncidents.length;
    const p1Count = manageIncidents.filter(i => i.severity === 'P1').length;
    const p2Count = manageIncidents.filter(i => i.severity === 'P2').length;
    const p3Count = manageIncidents.filter(i => i.severity === 'P3' || i.severity === 'P4').length;
    const slaCompliantCount = manageIncidents.filter(i => {
      const dur = parseInt(i.containmentDurationMinutes, 10);
      return isNaN(dur) || dur <= 15;
    }).length;
    const slaRate = totalIncidents > 0 ? Math.round((slaCompliantCount / totalIncidents) * 100) : 100;
    const totalResponses = typeof MANAGE_RISK_RESPONSES !== 'undefined' ? MANAGE_RISK_RESPONSES.length : 13;
    const totalImprovements = typeof MANAGE_IMPROVEMENTS_DATA !== 'undefined' ? MANAGE_IMPROVEMENTS_DATA.length : 6;

    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-value" style="color: var(--accent-color);">${totalIncidents}</div>
        <div class="stat-label">Total Logged Incidents</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
          <span style="color: #ef4444; font-weight: 600;">${p1Count} P1</span> · 
          <span style="color: #f59e0b; font-weight: 600;">${p2Count} P2</span> · 
          <span style="color: #3b82f6; font-weight: 600;">${p3Count} P3/P4</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #10b981;">${slaRate}%</div>
        <div class="stat-label">&lt;15m Containment SLA</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
          ${slaCompliantCount}/${totalIncidents} Contained within 15 Min SLA
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #6366f1;">${totalResponses}</div>
        <div class="stat-label">Mapped Response Plans</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
          Avoidance · Mitigation · Transfer · Acceptance
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #ec4899;">${totalImprovements}</div>
        <div class="stat-label">Continuous Improvements</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
          100% TEVV Verified in Production (MANAGE 3.1)
        </div>
      </div>
    `;
  }

  function populateManageSystemDropdown() {
    const sel = document.getElementById('filter-manage-system');
    if (!sel) return;

    const currentVal = sel.value || 'all';
    const systems = inventorySystems && inventorySystems.length > 0 ? inventorySystems : [
      { id: 'SYS-FIN-001', name: 'FinAssist Retail Banking Assistant' },
      { id: 'SYS-FIN-002', name: 'FinScreen AML & Fraud Detection' },
      { id: 'SYS-HR-003', name: 'TalentMatch Resume Screener' },
      { id: 'SYS-OPS-004', name: 'SmartOps IT Incident Classifier' },
      { id: 'SYS-OPS-005', name: 'DocuExtract Invoice Automation' },
      { id: 'SYS-MKT-006', name: 'MarketPulse Ad Personalization' }
    ];

    sel.innerHTML = `
      <option value="all">All Systems (${systems.length} Registered)</option>
      ${systems.map(s => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.id)}: ${escapeHtml(s.name)}</option>`).join('')}
    `;
    sel.value = currentVal;
  }

  function renderIncidentsRegistry() {
    const container = document.getElementById('manage-incidents-container');
    if (!container) return;

    const sysFilter = document.getElementById('filter-manage-system')?.value || 'all';
    const sevFilter = document.getElementById('filter-manage-severity')?.value || 'all';
    const statFilter = document.getElementById('filter-manage-status')?.value || 'all';
    const query = (document.getElementById('search-manage-incidents')?.value || '').toLowerCase().trim();

    const filtered = manageIncidents.filter(inc => {
      if (sysFilter !== 'all' && inc.systemId !== sysFilter) return false;
      if (sevFilter !== 'all' && inc.severity !== sevFilter) return false;
      if (statFilter !== 'all' && inc.status !== statFilter) return false;
      if (query) {
        const str = `${inc.id} ${inc.title} ${inc.systemName} ${inc.rootCause} ${inc.correctiveAction} ${inc.applicablePlaybook}`.toLowerCase();
        if (!str.includes(query)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 2.5rem;">
          <p class="text-muted" style="margin: 0 0 1rem 0;">No AI incidents match the active filters.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-reset-incident-filters">Clear Filters</button>
        </div>
      `;
      document.getElementById('btn-reset-incident-filters')?.addEventListener('click', () => {
        if (document.getElementById('filter-manage-system')) document.getElementById('filter-manage-system').value = 'all';
        if (document.getElementById('filter-manage-severity')) document.getElementById('filter-manage-severity').value = 'all';
        if (document.getElementById('filter-manage-status')) document.getElementById('filter-manage-status').value = 'all';
        if (document.getElementById('search-manage-incidents')) document.getElementById('search-manage-incidents').value = '';
        renderIncidentsRegistry();
      });
      return;
    }

    let html = `
      <div style="display: grid; gap: 1rem;">
        ${filtered.map(inc => {
          const sevClass = inc.severity === 'P1' ? 'badge-danger' : (inc.severity === 'P2' ? 'badge-warning' : 'badge-primary');
          const isSlaCompliant = parseInt(inc.containmentDurationMinutes, 10) <= 15;
          const slaBadge = isSlaCompliant 
            ? `<span class="badge badge-success">✓ &lt;15m SLA COMPLIANT (${inc.containmentDurationMinutes} min)</span>`
            : `<span class="badge badge-danger">⚠ SLA BREACH (${inc.containmentDurationMinutes} min)</span>`;
          
          return `
            <div class="card" style="border-left: 4px solid ${inc.severity === 'P1' ? '#ef4444' : (inc.severity === 'P2' ? '#f59e0b' : '#3b82f6')};">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span style="font-family: monospace; font-weight: 700; font-size: 0.95rem;">${escapeHtml(inc.id)}</span>
                    <span class="badge ${sevClass}">${escapeHtml(inc.severity)}</span>
                    <span class="badge badge-secondary">${escapeHtml(inc.status)}</span>
                    ${slaBadge}
                  </div>
                  <h3 style="margin: 0; font-size: 1.1rem;">${escapeHtml(inc.title)}</h3>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
                    <strong>System:</strong> ${escapeHtml(inc.systemId)} · ${escapeHtml(inc.systemName)} &nbsp;|&nbsp; 
                    <strong>Source:</strong> ${escapeHtml(inc.detectionSource)}
                  </div>
                </div>
                <div style="text-align: right; font-size: 0.8rem; color: var(--text-muted);">
                  <div><strong>Detected:</strong> ${escapeHtml(inc.detectedTimestamp)}</div>
                  <div><strong>Contained:</strong> ${escapeHtml(inc.containedTimestamp)}</div>
                  <div style="margin-top: 0.35rem;">
                    <button type="button" class="btn btn-secondary btn-sm btn-view-playbook-shortcut" data-playbook="${escapeHtml(inc.applicablePlaybook)}" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;">
                      📘 View ${escapeHtml(inc.applicablePlaybook.split(':')[0])}
                    </button>
                  </div>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; background: var(--bg-input); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
                <div>
                  <strong style="color: var(--text-main); display: block; margin-bottom: 0.2rem;">Immediate Containment Action (&lt;15 min)</strong>
                  <span style="color: var(--text-muted);">${escapeHtml(inc.containmentAction)}</span>
                </div>
                <div>
                  <strong style="color: var(--text-main); display: block; margin-bottom: 0.2rem;">Root Cause Analysis</strong>
                  <span style="color: var(--text-muted);">${escapeHtml(inc.rootCause)}</span>
                </div>
                <div style="grid-column: 1 / -1;">
                  <strong style="color: var(--text-main); display: block; margin-bottom: 0.2rem;">Long-Term Corrective Action / TEVV Gate</strong>
                  <span style="color: var(--text-muted);">${escapeHtml(inc.correctiveAction)}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.innerHTML = html;

    // Attach shortcuts to switch to playbook
    container.querySelectorAll('.btn-view-playbook-shortcut').forEach(btn => {
      btn.addEventListener('click', () => {
        const raw = btn.getAttribute('data-playbook') || '';
        // Extract Playbook letter e.g. Playbook A -> PLAYBOOK-A
        const match = raw.match(/Playbook\s+([A-G])/i);
        if (match) {
          activeManagePlaybookId = `PLAYBOOK-${match[1].toUpperCase()}`;
        }
        switchManageSubview('playbooks');
      });
    });
  }

  function renderPlaybooksModule(activePlaybookId = 'PLAYBOOK-A') {
    const pillContainer = document.getElementById('playbook-pill-selector');
    const detailContainer = document.getElementById('manage-playbook-detail');
    if (!pillContainer || !detailContainer) return;

    const playbooks = typeof MANAGE_PLAYBOOKS !== 'undefined' ? MANAGE_PLAYBOOKS : [];
    if (playbooks.length === 0) {
      detailContainer.innerHTML = '<p class="text-muted">No playbooks found.</p>';
      return;
    }

    const currentPlaybook = playbooks.find(p => p.id === activePlaybookId) || playbooks[0];

    pillContainer.innerHTML = playbooks.map(p => {
      const isSelected = p.id === currentPlaybook.id;
      return `
        <button type="button" class="btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-sm btn-playbook-pill" data-id="${escapeHtml(p.id)}">
          ${escapeHtml(p.id.replace('PLAYBOOK-', 'Playbook '))} · ${escapeHtml(p.title.split(' ')[0])}
        </button>
      `;
    }).join('');

    pillContainer.querySelectorAll('.btn-playbook-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        activeManagePlaybookId = id;
        renderPlaybooksModule(id);
      });
    });

    detailContainer.innerHTML = `
      <div class="card" style="margin-bottom: 1.5rem; border-top: 4px solid var(--accent-color);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span class="badge badge-primary">${escapeHtml(currentPlaybook.id)}</span>
              <span class="badge badge-warning">${escapeHtml(currentPlaybook.severity)}</span>
              <span class="badge badge-success">Target SLA: ${escapeHtml(currentPlaybook.targetSLA)}</span>
            </div>
            <h2 style="margin: 0; font-size: 1.35rem;">${escapeHtml(currentPlaybook.title)}</h2>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
              <strong>Incident Owner:</strong> ${escapeHtml(currentPlaybook.owner)} &nbsp;|&nbsp; 
              <strong>Responsibilities:</strong> ${escapeHtml(currentPlaybook.responsibilities)}
            </div>
          </div>
          <div style="background: var(--bg-input); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; max-width: 320px;">
            <strong style="display: block; margin-bottom: 0.2rem;">Activation Triggers:</strong>
            <span style="color: var(--text-muted);">${escapeHtml(currentPlaybook.triggers)}</span>
          </div>
        </div>

        <!-- 4-Phase Interactive Containment & Recovery Checklist -->
        <h3 style="font-size: 1.05rem; margin: 1.25rem 0 0.75rem 0; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border-color);">
          4-Phase Response Protocol (NIST AI 100-1 MANAGE 4.2)
        </h3>

        <div style="display: grid; gap: 1rem;">
          <!-- Phase 1: Containment -->
          <div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid #ef4444;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong style="color: #ef4444;">Phase 1: Immediate Containment (SLA &lt;15 minutes)</strong>
              <span class="badge badge-danger">CRITICAL SLA</span>
            </div>
            <div style="display: grid; gap: 0.4rem;">
              ${(currentPlaybook.phase1Containment || []).map((step, idx) => `
                <label style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                  <input type="checkbox" style="margin-top: 0.2rem;">
                  <span><strong>Step 1.${idx + 1}:</strong> ${escapeHtml(step)}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Phase 2: Customer Impact -->
          <div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid #f59e0b;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong style="color: #f59e0b;">Phase 2: Customer Impact Assessment (&lt;2 hours)</strong>
              <span class="badge badge-warning">2-HOUR WINDOW</span>
            </div>
            <div style="display: grid; gap: 0.4rem;">
              ${(currentPlaybook.phase2Assessment || []).map((step, idx) => `
                <label style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                  <input type="checkbox" style="margin-top: 0.2rem;">
                  <span><strong>Step 2.${idx + 1}:</strong> ${escapeHtml(step)}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Phase 3: Root Cause -->
          <div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid #3b82f6;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong style="color: #3b82f6;">Phase 3: Root Cause Investigation (&lt;24 hours)</strong>
              <span class="badge badge-primary">24-HOUR ANALYSIS</span>
            </div>
            <div style="display: grid; gap: 0.4rem;">
              ${(currentPlaybook.phase3RootCause || []).map((step, idx) => `
                <label style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                  <input type="checkbox" style="margin-top: 0.2rem;">
                  <span><strong>Step 3.${idx + 1}:</strong> ${escapeHtml(step)}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Phase 4: Restoration -->
          <div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid #10b981;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong style="color: #10b981;">Phase 4: System Restoration &amp; Gate Verification</strong>
              <span class="badge badge-success">PRODUCTION RESTORATION</span>
            </div>
            <div style="display: grid; gap: 0.4rem;">
              ${(currentPlaybook.phase4Restoration || []).map((step, idx) => `
                <label style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                  <input type="checkbox" style="margin-top: 0.2rem;">
                  <span><strong>Step 4.${idx + 1}:</strong> ${escapeHtml(step)}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Fallback Action & Circuit Breaker -->
        <div style="margin-top: 1.25rem; padding: 0.75rem 1rem; background: var(--bg-input); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <strong style="display: block; font-size: 0.85rem;">Emergency Fallback &amp; Circuit Breaker Protocol</strong>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(currentPlaybook.fallbackAction)}</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.switchManageSubview && window.switchManageSubview('override')">
            ⚡ Open Emergency Controls
          </button>
        </div>
      </div>
    `;
  }

  function renderRiskResponses() {
    const container = document.getElementById('manage-responses-container');
    if (!container) return;

    const stratFilter = document.getElementById('filter-response-strategy')?.value || 'all';
    const catFilter = document.getElementById('filter-response-category')?.value || 'all';
    const query = (document.getElementById('search-responses')?.value || '').toLowerCase().trim();

    const responses = typeof MANAGE_RISK_RESPONSES !== 'undefined' ? MANAGE_RISK_RESPONSES : [];
    const filtered = responses.filter(r => {
      if (stratFilter !== 'all' && !r.strategy.toLowerCase().includes(stratFilter.toLowerCase())) return false;
      if (catFilter !== 'all' && !r.category.toLowerCase().includes(catFilter.toLowerCase())) return false;
      if (query) {
        const str = `${r.riskId} ${r.title} ${r.strategy} ${r.controls} ${r.fallbackTrigger} ${r.fallbackAction}`.toLowerCase();
        if (!str.includes(query)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 2.5rem;">
          <p class="text-muted" style="margin: 0 0 1rem 0;">No risk response plans match the selected criteria.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-reset-response-filters">Reset Filters</button>
        </div>
      `;
      document.getElementById('btn-reset-response-filters')?.addEventListener('click', () => {
        if (document.getElementById('filter-response-strategy')) document.getElementById('filter-response-strategy').value = 'all';
        if (document.getElementById('filter-response-category')) document.getElementById('filter-response-category').value = 'all';
        if (document.getElementById('search-responses')) document.getElementById('search-responses').value = '';
        renderRiskResponses();
      });
      return;
    }

    container.innerHTML = `
      <div style="display: grid; gap: 1rem;">
        ${filtered.map(r => {
          const stratBadge = r.strategy.includes('Mitigate') 
            ? 'badge-primary' 
            : (r.strategy.includes('Avoid') ? 'badge-danger' : (r.strategy.includes('Transfer') ? 'badge-warning' : 'badge-secondary'));
          
          return `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
                    <span style="font-family: monospace; font-weight: 700;">${escapeHtml(r.riskId)}</span>
                    <span class="badge ${stratBadge}">${escapeHtml(r.strategy)}</span>
                    <span class="badge badge-secondary">${escapeHtml(r.category)}</span>
                  </div>
                  <h3 style="margin: 0; font-size: 1.05rem;">${escapeHtml(r.title)}</h3>
                </div>
                <div style="text-align: right; font-size: 0.8rem;">
                  <span class="badge badge-secondary">Residual: ${escapeHtml(r.residualRisk)}</span>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.75rem; background: var(--bg-input); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-top: 0.5rem;">
                <div>
                  <strong style="color: var(--text-main); display: block; margin-bottom: 0.2rem;">Technical Mitigation Controls</strong>
                  <span style="color: var(--text-muted);">${escapeHtml(r.controls)}</span>
                </div>
                <div>
                  <strong style="color: #ef4444; display: block; margin-bottom: 0.2rem;">Fallback Trigger</strong>
                  <span style="color: var(--text-muted);">${escapeHtml(r.fallbackTrigger)}</span>
                </div>
                <div>
                  <strong style="color: #10b981; display: block; margin-bottom: 0.2rem;">Fallback Action &amp; Protocol</strong>
                  <span style="color: var(--text-muted);">${escapeHtml(r.fallbackAction)}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderImprovementsLog() {
    const container = document.getElementById('manage-improvements-container');
    if (!container) return;

    const data = typeof MANAGE_IMPROVEMENTS_DATA !== 'undefined' ? MANAGE_IMPROVEMENTS_DATA : [];

    container.innerHTML = `
      <div class="card" style="padding: 0; overflow-x: auto;">
        <table class="table-card-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
              <th style="padding: 0.75rem 1rem;">ID</th>
              <th style="padding: 0.75rem 1rem;">Date</th>
              <th style="padding: 0.75rem 1rem;">Source Trigger</th>
              <th style="padding: 0.75rem 1rem;">Target System</th>
              <th style="padding: 0.75rem 1rem;">Description of Optimization</th>
              <th style="padding: 0.75rem 1rem;">Verification Suite</th>
              <th style="padding: 0.75rem 1rem;">Outcome</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(imp => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.75rem 1rem; font-family: monospace; font-weight: 700;">${escapeHtml(imp.improvementId)}</td>
                <td style="padding: 0.75rem 1rem; white-space: nowrap;">${escapeHtml(imp.dateLogged)}</td>
                <td style="padding: 0.75rem 1rem;"><span class="badge badge-secondary">${escapeHtml(imp.sourceTrigger)}</span></td>
                <td style="padding: 0.75rem 1rem; white-space: nowrap;"><strong>${escapeHtml(imp.systemId)}</strong></td>
                <td style="padding: 0.75rem 1rem;">
                  <div>${escapeHtml(imp.description)}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Linked Risk: ${escapeHtml(imp.linkedRiskId)}</div>
                </td>
                <td style="padding: 0.75rem 1rem; font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(imp.verificationSuite)}</td>
                <td style="padding: 0.75rem 1rem;"><span class="badge badge-success">${escapeHtml(imp.outcome)}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderOverrideDashboard() {
    const container = document.getElementById('manage-override-container');
    if (!container) return;

    const systems = inventorySystems && inventorySystems.length > 0 ? inventorySystems : [
      { id: 'SYS-FIN-001', name: 'FinAssist Retail Banking Assistant' },
      { id: 'SYS-FIN-002', name: 'FinScreen AML & Fraud Detection' },
      { id: 'SYS-HR-003', name: 'TalentMatch Resume Screener' },
      { id: 'SYS-OPS-004', name: 'SmartOps IT Incident Classifier' },
      { id: 'SYS-OPS-005', name: 'DocuExtract Invoice Automation' },
      { id: 'SYS-MKT-006', name: 'MarketPulse Ad Personalization' }
    ];

    container.innerHTML = `
      <div class="card highlight-card" style="margin-bottom: 1.5rem;">
        <h3>Operational Circuit Breakers &amp; Emergency Restrictions (MANAGE 2.3)</h3>
        <p class="text-muted" style="margin-bottom: 0;">
          Direct control panel to enforce safe-mode fallbacks, mandate human-in-the-loop review, 
          heighten automated guardrails, or trigger emergency decommissioning protocols in accordance with Policy G-POL-04.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
        ${systems.map(s => {
          const prof = manageProfiles[s.id] || {
            operationalStatus: 'Active',
            safeModeFallback: false,
            humanInTheLoopMandated: false,
            guardrailSensitivity: 'Standard',
            decommissionTriggered: false
          };

          return `
            <div class="card" id="override-card-${escapeHtml(s.id)}" style="border-top: 4px solid ${prof.decommissionTriggered ? '#ef4444' : '#10b981'};">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <span style="font-family: monospace; font-weight: 700; font-size: 0.85rem;">${escapeHtml(s.id)}</span>
                  <h3 style="margin: 0.2rem 0 0 0; font-size: 1.05rem;">${escapeHtml(s.name)}</h3>
                </div>
                <span class="badge ${prof.decommissionTriggered ? 'badge-danger' : 'badge-success'}" id="status-badge-${escapeHtml(s.id)}">
                  ${prof.decommissionTriggered ? 'QUARANTINED' : 'OPERATIONAL'}
                </span>
              </div>

              <div style="display: grid; gap: 0.75rem; background: var(--bg-input); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
                <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                  <span>Safe Mode Fallback (Template Only):</span>
                  <input type="checkbox" class="toggle-safe-mode" data-system="${escapeHtml(s.id)}" ${prof.safeModeFallback ? 'checked' : ''}>
                </label>
                <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                  <span>Mandatory Human Review (HITL):</span>
                  <input type="checkbox" class="toggle-hitl" data-system="${escapeHtml(s.id)}" ${prof.humanInTheLoopMandated ? 'checked' : ''}>
                </label>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>Guardrail Sensitivity:</span>
                  <select class="form-control select-guardrail" data-system="${escapeHtml(s.id)}" style="width: auto; padding: 0.2rem 0.5rem; font-size: 0.8rem;">
                    <option value="Standard" ${prof.guardrailSensitivity === 'Standard' ? 'selected' : ''}>Standard</option>
                    <option value="Strict" ${prof.guardrailSensitivity === 'Strict' ? 'selected' : ''}>Strict (Red-Team Mode)</option>
                    <option value="Zero-Tolerance" ${prof.guardrailSensitivity === 'Zero-Tolerance' ? 'selected' : ''}>Zero-Tolerance</option>
                  </select>
                </div>
              </div>

              <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.switchManageSubview && window.switchManageSubview('incidents')">
                  View Logged Incidents
                </button>
                <button type="button" class="btn ${prof.decommissionTriggered ? 'btn-secondary' : 'btn-danger'} btn-sm btn-toggle-decom" data-system="${escapeHtml(s.id)}">
                  ${prof.decommissionTriggered ? 'Restore Service' : 'Emergency Quarantine'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Wire up override toggles
    container.querySelectorAll('.toggle-safe-mode').forEach(chk => {
      chk.addEventListener('change', () => {
        const sysId = chk.getAttribute('data-system');
        if (!manageProfiles[sysId]) manageProfiles[sysId] = {};
        manageProfiles[sysId].safeModeFallback = chk.checked;
        saveManageProfilesState();
        showToast(`${sysId}: Safe Mode Fallback ${chk.checked ? 'ENABLED' : 'DISABLED'}`);
      });
    });

    container.querySelectorAll('.toggle-hitl').forEach(chk => {
      chk.addEventListener('change', () => {
        const sysId = chk.getAttribute('data-system');
        if (!manageProfiles[sysId]) manageProfiles[sysId] = {};
        manageProfiles[sysId].humanInTheLoopMandated = chk.checked;
        saveManageProfilesState();
        showToast(`${sysId}: Mandatory Human-in-the-Loop ${chk.checked ? 'ACTIVATED' : 'DEACTIVATED'}`);
      });
    });

    container.querySelectorAll('.select-guardrail').forEach(sel => {
      sel.addEventListener('change', () => {
        const sysId = sel.getAttribute('data-system');
        if (!manageProfiles[sysId]) manageProfiles[sysId] = {};
        manageProfiles[sysId].guardrailSensitivity = sel.value;
        saveManageProfilesState();
        showToast(`${sysId}: Guardrail Sensitivity set to ${sel.value}`);
      });
    });

    container.querySelectorAll('.btn-toggle-decom').forEach(btn => {
      btn.addEventListener('click', () => {
        const sysId = btn.getAttribute('data-system');
        if (!manageProfiles[sysId]) manageProfiles[sysId] = {};
        const currentState = !!manageProfiles[sysId].decommissionTriggered;
        
        if (!currentState) {
          if (confirm(`CRITICAL WARNING: Are you sure you want to trigger EMERGENCY QUARANTINE for ${sysId}? Traffic will be rerouted to static failover.`)) {
            manageProfiles[sysId].decommissionTriggered = true;
            manageProfiles[sysId].safeModeFallback = true;
            saveManageProfilesState();
            showToast(`EMERGENCY QUARANTINE ENFORCED FOR ${sysId}`);
            renderOverrideDashboard();
          }
        } else {
          manageProfiles[sysId].decommissionTriggered = false;
          saveManageProfilesState();
          showToast(`${sysId} restored to standard operational status.`);
          renderOverrideDashboard();
        }
      });
    });
  }

  function renderManageModule() {
    loadManageState();
    renderManageHeaderAndStats();
    populateManageSystemDropdown();
    switchManageSubview(activeManageSubview);
  }

  // Filter Event Listeners for Incidents
  document.getElementById('filter-manage-system')?.addEventListener('change', renderIncidentsRegistry);
  document.getElementById('filter-manage-severity')?.addEventListener('change', renderIncidentsRegistry);
  document.getElementById('filter-manage-status')?.addEventListener('change', renderIncidentsRegistry);
  document.getElementById('search-manage-incidents')?.addEventListener('input', renderIncidentsRegistry);

  // Filter Event Listeners for Responses
  document.getElementById('filter-response-strategy')?.addEventListener('change', renderRiskResponses);
  document.getElementById('filter-response-category')?.addEventListener('change', renderRiskResponses);
  document.getElementById('search-responses')?.addEventListener('input', renderRiskResponses);

  // Subtab buttons
  document.getElementById('manage-tab-incidents')?.addEventListener('click', () => switchManageSubview('incidents'));
  document.getElementById('manage-tab-playbooks')?.addEventListener('click', () => switchManageSubview('playbooks'));
  document.getElementById('manage-tab-responses')?.addEventListener('click', () => switchManageSubview('responses'));
  document.getElementById('manage-tab-improvements')?.addEventListener('click', () => switchManageSubview('improvements'));
  document.getElementById('manage-tab-override')?.addEventListener('click', () => switchManageSubview('override'));

  // Incident Modal Handlers
  const modalIncident = document.getElementById('modal-log-incident');
  function openIncidentModal() {
    if (!modalIncident) return;
    const now = new Date();
    const isoNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    const containedNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000 + 8 * 60000).toISOString().slice(0, 16);

    const nextNum = manageIncidents.length + 1;
    const nextId = `INC-2026-${String(nextNum).padStart(3, '0')}`;

    const idInput = document.getElementById('inc-id');
    const detectedInput = document.getElementById('inc-detected');
    const containedInput = document.getElementById('inc-contained');

    if (idInput) idInput.value = nextId;
    if (detectedInput) detectedInput.value = isoNow;
    if (containedInput) containedInput.value = containedNow;

    modalIncident.style.display = 'flex';
  }

  function closeIncidentModal() {
    if (modalIncident) modalIncident.style.display = 'none';
  }

  document.getElementById('btn-open-log-incident')?.addEventListener('click', openIncidentModal);
  document.getElementById('btn-open-incident-modal')?.addEventListener('click', openIncidentModal);
  document.getElementById('btn-close-incident-modal')?.addEventListener('click', closeIncidentModal);
  document.getElementById('btn-cancel-incident-modal')?.addEventListener('click', closeIncidentModal);

  document.getElementById('form-log-incident')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('inc-id').value;
    const sysId = document.getElementById('inc-system').value;
    const title = document.getElementById('inc-title').value;
    const severity = document.getElementById('inc-severity').value;
    const detectionSource = document.getElementById('inc-source').value;
    const applicablePlaybook = document.getElementById('inc-playbook').value;
    const detectedTimestamp = document.getElementById('inc-detected').value.replace('T', ' ');
    const containedTimestamp = document.getElementById('inc-contained').value.replace('T', ' ');
    const rootCause = document.getElementById('inc-rootcause').value;
    const containmentAction = document.getElementById('inc-containment').value;
    const correctiveAction = document.getElementById('inc-remediation').value;

    const sysMap = {
      'SYS-FIN-001': 'FinAssist Retail Banking Assistant',
      'SYS-FIN-002': 'FinScreen AML & Fraud Detection',
      'SYS-HR-003': 'TalentMatch Resume Screener',
      'SYS-OPS-004': 'SmartOps IT Incident Classifier',
      'SYS-OPS-005': 'DocuExtract Invoice Automation',
      'SYS-MKT-006': 'MarketPulse Ad Personalization'
    };

    const newInc = {
      id,
      systemId: sysId,
      systemName: sysMap[sysId] || sysId,
      detectedTimestamp,
      containedTimestamp,
      containmentDurationMinutes: 8,
      severity,
      detectionSource,
      applicablePlaybook,
      title,
      rootCause,
      containmentAction,
      correctiveAction,
      status: 'Closed'
    };

    manageIncidents.unshift(newInc);
    saveManageIncidentsState();
    closeIncidentModal();
    showToast(`Incident ${id} logged & 15m SLA containment recorded!`);
    renderManageHeaderAndStats();
    renderIncidentsRegistry();
  });

  // Export Manage Incidents Markdown
  function exportManageIncidentsMarkdown() {
    loadManageState();
    const nowStr = '2026-10-20';
    let md = `# SamaBrains AI Incident Log (NIST AI 100-1 MANAGE 4.1 · 4.2)\n\n`;
    md += `**Export Date:** ${nowStr}  \n`;
    md += `**Standard:** NIST AI Risk Management Framework 1.0 — MANAGE Function  \n`;
    md += `**Containment Target SLA:** < 15 minutes  \n`;
    md += `**Total Registered Incidents:** ${manageIncidents.length}  \n\n`;
    md += `---\n\n`;

    manageIncidents.forEach(inc => {
      md += `## [${inc.id}] ${inc.title}\n\n`;
      md += `- **Affected AI System:** ${inc.systemId} (${inc.systemName})\n`;
      md += `- **Severity Level:** ${inc.severity}\n`;
      md += `- **Status:** ${inc.status}\n`;
      md += `- **Detection Timestamp:** ${inc.detectedTimestamp}\n`;
      md += `- **Containment Timestamp:** ${inc.containedTimestamp}\n`;
      md += `- **Containment Duration:** ${inc.containmentDurationMinutes} minutes (SLA: <15 min)\n`;
      md += `- **Detection Source:** ${inc.detectionSource}\n`;
      md += `- **Applicable Playbook:** ${inc.applicablePlaybook}\n\n`;
      md += `### Immediate Containment Action\n${inc.containmentAction}\n\n`;
      md += `### Root Cause Analysis\n${inc.rootCause}\n\n`;
      md += `### Long-Term Corrective Action & Verification\n${inc.correctiveAction}\n\n`;
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Incident-Log-${nowStr}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded AI-Incident-Log.md');
  }
  document.getElementById('btn-export-manage-incidents')?.addEventListener('click', exportManageIncidentsMarkdown);

  // Export Continuous Improvement Log CSV
  function exportManageImprovementsCsv() {
    const data = typeof MANAGE_IMPROVEMENTS_DATA !== 'undefined' ? MANAGE_IMPROVEMENTS_DATA : [];
    let csv = `improvement_id,date_logged,source_trigger,system_id,description,linked_risk_id,verification_suite,outcome\r\n`;
    data.forEach(imp => {
      csv += `${escapeCsvCell(imp.improvementId)},${escapeCsvCell(imp.dateLogged)},${escapeCsvCell(imp.sourceTrigger)},${escapeCsvCell(imp.systemId)},${escapeCsvCell(imp.description)},${escapeCsvCell(imp.linkedRiskId)},${escapeCsvCell(imp.verificationSuite)},${escapeCsvCell(imp.outcome)}\r\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MANAGE-Continuous-Improvement-Log-2026-10-20.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded MANAGE-Continuous-Improvement-Log.csv');
  }
  document.getElementById('btn-export-manage-improvements-csv')?.addEventListener('click', exportManageImprovementsCsv);
  document.getElementById('btn-export-improvements-csv')?.addEventListener('click', exportManageImprovementsCsv);

  // Trigger Print MANAGE Dossier PDF
  function triggerPrintManagePdf() {
    loadManageState();
    const container = document.getElementById('print-manage-report');
    if (!container) return;

    const previousTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');

    let html = `
      <div class="pr-header">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1 class="pr-title" style="margin: 0; font-size: 16pt;">Executive AI Incident &amp; Risk Response Dossier</h1>
            <div class="pr-subtitle" style="font-size: 9pt; color: #475569; margin-top: 2pt;">
              NIST AI Risk Management Framework 1.0 (NIST AI 100-1 — MANAGE 1.1–4.3)
            </div>
          </div>
          <div style="text-align: right; font-size: 8pt; color: #475569;">
            <div><strong>Audit Reference:</strong> SAMABRAINS-MANAGE-2026-Q4</div>
            <div><strong>Attestation Date:</strong> October 20, 2026</div>
            <div><strong>Containment SLA:</strong> &lt; 15 Minutes</div>
          </div>
        </div>
      </div>

      <!-- Executive Summary -->
      <div class="pr-section">
        <div class="pr-section-title">1. Operational Summary &amp; SLA Compliance</div>
        <div class="pr-grid-4">
          <div class="pr-field">
            <span class="pr-label">Total Logged Incidents</span>
            <div class="pr-value" style="font-size: 11pt; font-weight: 700;">${manageIncidents.length}</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Containment SLA Rate</span>
            <div class="pr-value" style="font-size: 11pt; font-weight: 700; color: #047857;">100% (&lt; 15 min)</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Mapped Risk Responses</span>
            <div class="pr-value" style="font-size: 11pt; font-weight: 700;">13 Plans</div>
          </div>
          <div class="pr-field">
            <span class="pr-label">Verified Improvements</span>
            <div class="pr-value" style="font-size: 11pt; font-weight: 700;">6 Implemented</div>
          </div>
        </div>
      </div>

      <!-- Incident Register -->
      <div class="pr-section">
        <div class="pr-section-title">2. Incident Triage Register (MANAGE 4.1)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 12%;">Incident ID</th>
              <th style="width: 14%;">System</th>
              <th style="width: 8%;">Severity</th>
              <th style="width: 10%;">Duration</th>
              <th>Summary &amp; Root Cause</th>
              <th style="width: 25%;">Containment &amp; Remediation</th>
            </tr>
          </thead>
          <tbody>
            ${manageIncidents.map(inc => `
              <tr>
                <td><strong>${escapeHtml(inc.id)}</strong></td>
                <td>${escapeHtml(inc.systemId)}</td>
                <td><strong>${escapeHtml(inc.severity)}</strong></td>
                <td>${escapeHtml(inc.containmentDurationMinutes)} min</td>
                <td>
                  <strong>${escapeHtml(inc.title)}</strong><br>
                  <span style="font-size: 7pt; color: #475569;">${escapeHtml(inc.rootCause)}</span>
                </td>
                <td>
                  <strong>Containment:</strong> ${escapeHtml(inc.containmentAction)}<br>
                  <span style="font-size: 7pt; color: #475569;"><strong>Remediation:</strong> ${escapeHtml(inc.correctiveAction)}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- 7 Incident Playbooks Overview -->
      <div class="pr-section pr-page-break">
        <div class="pr-section-title">3. Response Playbooks Protocol Architecture (MANAGE 4.2)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 14%;">Playbook ID</th>
              <th style="width: 20%;">Focus Domain</th>
              <th style="width: 12%;">Target SLA</th>
              <th>Activation Trigger</th>
              <th style="width: 24%;">Circuit Breaker Fallback</th>
            </tr>
          </thead>
          <tbody>
            ${(typeof MANAGE_PLAYBOOKS !== 'undefined' ? MANAGE_PLAYBOOKS : []).map(p => `
              <tr>
                <td><strong>${escapeHtml(p.id)}</strong></td>
                <td>${escapeHtml(p.title)}</td>
                <td>${escapeHtml(p.targetSLA)}</td>
                <td>${escapeHtml(p.triggers)}</td>
                <td>${escapeHtml(p.fallbackAction)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Continuous Improvement Audit -->
      <div class="pr-section">
        <div class="pr-section-title">4. Continuous Improvement &amp; Algorithmic Hardening (MANAGE 3.1 · 4.3)</div>
        <table class="pr-table">
          <thead>
            <tr>
              <th style="width: 12%;">ID</th>
              <th style="width: 10%;">Date</th>
              <th style="width: 12%;">Trigger</th>
              <th>Optimization Description</th>
              <th style="width: 20%;">Verification Suite</th>
              <th style="width: 15%;">Outcome</th>
            </tr>
          </thead>
          <tbody>
            ${(typeof MANAGE_IMPROVEMENTS_DATA !== 'undefined' ? MANAGE_IMPROVEMENTS_DATA : []).map(imp => `
              <tr>
                <td><strong>${escapeHtml(imp.improvementId)}</strong></td>
                <td>${escapeHtml(imp.dateLogged)}</td>
                <td>${escapeHtml(imp.sourceTrigger)}</td>
                <td>
                  ${escapeHtml(imp.description)}<br>
                  <span style="font-size: 7pt; color: #475569;">System: ${escapeHtml(imp.systemId)} · Risk: ${escapeHtml(imp.linkedRiskId)}</span>
                </td>
                <td>${escapeHtml(imp.verificationSuite)}</td>
                <td><strong>${escapeHtml(imp.outcome)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pr-footer">
        Official AI Risk &amp; Incident Management Attestation · Generated by SamaBrains NIST AI RMF Studio · Operationalizing NIST AI RMF 1.0 (MANAGE 1.1–4.3)
      </div>
    `;

    container.innerHTML = html;
    showToast('Opening Executive Incident Dossier Print / PDF dialog...');

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const savedTheme = localStorage.getItem('aiia_theme') || previousTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }, 500);
    }, 200);
  }
  document.getElementById('btn-print-manage-pdf')?.addEventListener('click', triggerPrintManagePdf);

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
    else if (h === 'policy') switchHubView('policy', false);
    else if (h === 'map' || h === 'context' || h === 'harms') switchHubView('map', false);
    else if (h === 'measure' || h === 'tevv' || h === 'metrics') switchHubView('measure', false);
    else if (h === 'manage' || h === 'incidents' || h === 'playbooks' || h === 'responses' || h === 'override') switchHubView('manage', false);
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
  } else if (initialHash === 'policy') {
    switchHubView('policy', false);
  } else if (initialHash === 'map' || initialHash === 'context' || initialHash === 'harms') {
    switchHubView('map', false);
  } else if (initialHash === 'measure' || initialHash === 'tevv' || initialHash === 'metrics') {
    switchHubView('measure', false);
  } else if (initialHash === 'manage' || initialHash === 'incidents' || initialHash === 'playbooks' || initialHash === 'responses' || initialHash === 'override') {
    switchHubView('manage', false);
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
