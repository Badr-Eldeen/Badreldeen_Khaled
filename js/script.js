/**
 * PORTFOLIO SCRIPT — BADRELDEN KHALED GHAREEB
 * Aspiring SOC Analyst | Incident Response
 * Pure Vanilla JavaScript — Production Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME TOGGLE (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileNavBackdrop.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNavBackdrop.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileNav);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Auto-close drawer if screen is rotated or resized to desktop viewport
  window.addEventListener('resize', () => {
    if (window.innerWidth > 868 && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* ==========================================================================
     3. ACTIVE SECTION SPY & SMOOTH SCROLLING
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        
        // Update desktop links
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update mobile links
        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  /* ==========================================================================
     4. SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('revealed'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  /* ==========================================================================
     5. INVESTIGATION LAB DETAIL MODAL DATA & CONTROLS
     ========================================================================== */
  const labModalData = {
    'lab-traffic': {
      category: 'Network Packet Forensics & Telemetry Analysis',
      title: 'Network Traffic Investigation Lab — Wireshark PCAP Deep-Dive',
      content: `
        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-flag"></i> Lab Objective &amp; Problem Scenario</h4>
          <p>
            An alert was raised regarding anomalous external data transmission originating from an internal host (192.168.1.105). The objective was to analyze captured packet telemetry (.pcap) using Wireshark to reconstruct communication channels, isolate suspicious connections, and harvest indicators of compromise.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-filter"></i> Investigation Filter Methodology</h4>
          <p>Utilized targeted Wireshark display filters to isolate anomalous protocols and session flows:</p>
          <div class="telemetry-snippet">
            // Inspecting High-Frequency DNS Queries<br>
            dns.flags.response == 0 &amp;&amp; dns.qry.name contains "corp"<br><br>
            // Isolating Abnormal TCP SYN Handshake Attempts<br>
            tcp.flags.syn == 1 &amp;&amp; tcp.flags.ack == 0 &amp;&amp; tcp.window_size <= 1024<br><br>
            // Carving Cleartext HTTP Infiltration/Exfiltration<br>
            http.request.method == "POST" || http.request.method == "GET"
          </div>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-magnifying-glass-chart"></i> Key Investigative Findings</h4>
          <ul class="feature-bullets">
            <li><strong>DNS Tunneling / Beaconing:</strong> Repeated DNS requests querying high-entropy subdomains under a dynamic DNS provider, characteristic of C2 command polling.</li>
            <li><strong>Unencrypted Web Traffic:</strong> Extracted an unencrypted HTTP POST request transmitting simulated user credentials in cleartext.</li>
            <li><strong>TCP Conversation Reconstruction:</strong> Identified persistent half-open SYN packets directed at external IP 203.0.113.45 across non-standard port 8443.</li>
          </ul>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Harvested Indicators of Compromise (IOCs)</h4>
          <div class="telemetry-snippet">
            [IOC-01] IP Address: 203.0.113.45:8443 (Suspected External C2 Beacon)<br>
            [IOC-02] Domain: sync-update-service.ddns.net (Dynamic C2 Infrastructure)<br>
            [IOC-03] Internal Source: 192.168.1.105 (Host MAC: 00:0C:29:4F:8E:1A)<br>
            [IOC-04] Protocol: DNS TXT Records containing base64 payload fragments
          </div>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-shield-halved"></i> Defensive Recommendations</h4>
          <p>
            Enforce strict internal DNS resolution through authorized recursive resolvers, restrict outbound traffic on non-standard ports at the firewall perimeter, and configure Snort IDS rules to detect high-entropy DNS subdomain queries.
          </p>
        </div>
      `
    },
    'lab-snort': {
      category: 'Intrusion Detection System (IDS) Engineering',
      title: 'Network Intrusion Detection Lab — Snort Rule Architecture',
      content: `
        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-flag"></i> Lab Objective &amp; Problem Scenario</h4>
          <p>
            Deploy and configure Snort IDS within a simulated Linux network to evaluate signature-based threat detection. The goal was to write custom detection rules, validate packet inspection against synthetic attacks, and fine-tune thresholding to prevent alert fatigue.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-code"></i> Custom Snort Rules Implemented</h4>
          <div class="telemetry-snippet">
            # Alert on Inbound Port Sweep Reconnaissance<br>
            alert tcp $EXTERNAL_NET any -> $HOME_NET any (flags: S; threshold: type both, track by_src, count 20, seconds 5; msg:"RECON - Rapid TCP SYN Port Sweep Detected"; sid:1000001; rev:1;)<br><br>
            # Alert on Malicious Shell Payload Signatures in FTP Session<br>
            alert tcp $EXTERNAL_NET any -> $HOME_NET 21 (content:"/bin/sh"; nocase; msg:"EXPLOIT - Possible Command Injection in FTP Stream"; sid:1000002; rev:1;)
          </div>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-clipboard-check"></i> Verification &amp; Alert Logging</h4>
          <p>
            Generated controlled traffic using crafting utilities and verified Snort alert logs in <code>/var/log/snort/alert</code>. Tested threshold configurations to effectively suppress false positives triggered by routine multi-connection applications while preserving high fidelity for malicious sweeps.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-shield-halved"></i> Incident Response Takeaways</h4>
          <p>
            Signature-based detection requires precise payload content matching, correct bidirectional packet tracking, and continuous threshold tuning to remain actionable for SOC Level 1 analysts.
          </p>
        </div>
      `
    },
    'lab-nmap': {
      category: 'Reconnaissance & Attack Surface Management',
      title: 'Network Reconnaissance & Scanning Lab — Defender Auditing',
      content: `
        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-flag"></i> Lab Objective &amp; Scope</h4>
          <p>
            Audited a multi-host virtual subnet in VirtualBox to understand how adversaries map network topologies, uncover listening services, and discover unpatched vulnerabilities.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-terminal"></i> Scanning Commands &amp; Execution</h4>
          <div class="telemetry-snippet">
            # Subnet Ping Sweep &amp; Host Discovery<br>
            nmap -sn 10.0.2.0/24 -oN host_discovery.txt<br><br>
            # Stealth SYN Scan with Service Interrogation &amp; OS Detection<br>
            nmap -sS -sV -O -p- --min-rate 300 10.0.2.15 -oA host_audit_10_0_2_15<br><br>
            # Targeted Vulnerability Assessment with NSE Scripts<br>
            nmap -sV --script=vuln 10.0.2.15 -p 21,80,445
          </div>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-triangle-exclamation"></i> Identified Exposures</h4>
          <ul class="feature-bullets">
            <li><strong>Legacy Services:</strong> Unencrypted FTP server running with default anonymous login enabled.</li>
            <li><strong>Service Banner Disclosure:</strong> Detailed server version strings revealed in HTTP headers, facilitating known CVE matching.</li>
            <li><strong>Exposed SMB:</strong> SMB port 445 open with deprecated dialect negotiation permitted.</li>
          </ul>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-shield-halved"></i> Hardening Remediation</h4>
          <p>
            Disable unused services, enforce SSH over Telnet/FTP, suppress server banner version exposure, and restrict SMB to authenticated internal network segments.
          </p>
        </div>
      `
    },
    'lab-windows': {
      category: 'Endpoint Telemetry & Host Triage',
      title: 'Windows Endpoint Investigation Lab — Native DFIR Triage',
      content: `
        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-flag"></i> Scenario &amp; Initial Indicator</h4>
          <p>
            Simulated an endpoint intrusion where a malicious macro spawned a background payload. The objective was to triage the host using Windows Task Manager, Event Viewer, and PowerShell without relying on heavy third-party agents.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-bolt"></i> Windows Event Log Correlated IDs</h4>
          <div class="telemetry-snippet">
            [Event ID 4688] A new process has been created<br>
            &nbsp;&nbsp;-> Creator Process: WINWORD.EXE<br>
            &nbsp;&nbsp;-> New Process: powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgA...<br><br>
            [Event ID 4624] Successful Account Logon (Logon Type 3: Network Logon)<br><br>
            [Event ID 4698] A scheduled task was created<br>
            &nbsp;&nbsp;-> Task Name: "SystemUpdateHelper" -> Target: C:\\Users\\Public\\updater.bat
          </div>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-clock-rotate-left"></i> Timeline Reconstruction</h4>
          <p>
            Correlated parent-child process relationships to demonstrate execution flow: Word Document &rarr; Encoded PowerShell &rarr; Public folder staging &rarr; Scheduled task creation for persistent survival across reboots.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-shield-halved"></i> Defensive Action</h4>
          <p>
            Identified persistence registry run keys, terminated rogue background processes via PowerShell <code>Stop-Process</code>, isolated host from virtual network segment, and exported forensic event logs for documentation.
          </p>
        </div>
      `
    },
    'lab-malware': {
      category: 'Static Analysis & Threat Detection Machine Learning',
      title: 'Malware / IOC Investigation & Random Forest Detection',
      content: `
        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-flag"></i> Problem Statement</h4>
          <p>
            Signature hashing alone fails against polymorphic binaries and packers. This project evaluated portable executable (PE) structural characteristics and Shannon entropy features to distinguish packed/malicious executables from legitimate software.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-chart-line"></i> Feature Extraction &amp; Entropy Analysis</h4>
          <div class="telemetry-snippet">
            # Python PE Analysis Pipeline<br>
            import pefile<br>
            pe = pefile.PE(sample_path)<br>
            for section in pe.sections:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;entropy = section.get_entropy()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;print(f"{section.Name.decode().strip()}: Entropy={entropy:.2f}")<br><br>
            # Observed Characteristic:<br>
            # Benign sections typically exhibit Entropy < 6.4<br>
            # Packed / Encrypted Malicious sections exhibit Entropy > 7.1
          </div>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-brain"></i> Random Forest Classifier</h4>
          <p>
            Trained a supervised Random Forest model on feature vectors containing section entropy, virtual vs raw sizing anomalies, and suspicious API imports (e.g. <code>VirtualAlloc</code>, <code>WriteProcessMemory</code>, <code>CreateRemoteThread</code>). The model demonstrated high precision in highlighting packed malware samples.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-shield-halved"></i> Practical SOC Utility</h4>
          <p>
            Integrates into automated file triage pipelines to score inbound attachments before sandbox detonation, reducing Level-1 analyst inspection overhead.
          </p>
        </div>
      `
    },
    'lab-siem': {
      category: 'Security Operations & Continuous Monitoring',
      title: 'Security Monitoring / SIEM Lab Testbed (Currently Developing)',
      content: `
        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-compass"></i> Roadmap &amp; Project Blueprint</h4>
          <p>
            This project is currently under active development. The goal is to build an accessible, scalable SIEM testbed in an isolated lab environment to practice multi-source log ingestion, rule creation, and Tier-1 SOC incident handling workflows.
          </p>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-cubes"></i> Planned Architecture</h4>
          <div class="telemetry-snippet">
            [Endpoint Agents] Windows Sysmon + Linux Auditd<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&darr; (Encrypted Syslog / Log Shipper)<br>
            [SIEM Cluster] Telemetry Ingestion &amp; Normalization Pipeline<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&darr; (Correlation Queries &amp; Detection Rules)<br>
            [Alert Console] Tier-1 Triage Dashboard &amp; Case Management
          </div>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Development Milestones</h4>
          <ul class="feature-bullets">
            <li><strong>Phase 1 (Completed):</strong> Designed lab network topology and provisioned virtualization host.</li>
            <li><strong>Phase 2 (In Progress):</strong> Configuring Sysmon schema to capture process spawning and network connections.</li>
            <li><strong>Phase 3 (Upcoming):</strong> Drafting correlation rules for brute-force logon spikes (Event 4625 followed by 4624) and privilege escalation alerts.</li>
          </ul>
        </div>

        <div class="modal-block">
          <h4 class="modal-section-title"><i class="fa-solid fa-shield-halved"></i> Transparent Commitment</h4>
          <p>
            In accordance with professional honesty, this lab is designated as "Currently Developing" to accurately reflect active learning rather than claiming unverified production experience.
          </p>
        </div>
      `
    }
  };

  const labModal = document.getElementById('lab-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalLabTitle = document.getElementById('modal-lab-title');
  const modalLabCategory = document.getElementById('modal-lab-category');
  const modalLabBody = document.getElementById('modal-lab-body');
  const viewLabButtons = document.querySelectorAll('.view-lab-btn');

  function openLabModal(labId) {
    const data = labModalData[labId];
    if (!data) return;

    modalLabCategory.textContent = data.category;
    modalLabTitle.textContent = data.title;
    modalLabBody.innerHTML = data.content;

    labModal.classList.add('open');
    labModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLabModal() {
    labModal.classList.remove('open');
    labModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  viewLabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const labId = btn.getAttribute('data-lab');
      openLabModal(labId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeLabModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeLabModal);

  // Close modal on backdrop click
  if (labModal) {
    labModal.addEventListener('click', (e) => {
      if (e.target === labModal) {
        closeLabModal();
      }
    });
  }

  // Keyboard escape listener for modal & drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (labModal && labModal.classList.contains('open')) {
        closeLabModal();
      }
      if (mobileNav && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    }
  });

  /* ==========================================================================
     6. CONTACT FORM VALIDATION & CLIENT-SIDE FEEDBACK
     ========================================================================== */
  const contactForm = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const formStatusAlert = document.getElementById('form-status-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      // Helper for validating inputs
      function checkField(input, errorId, condition) {
        const errorEl = document.getElementById(errorId);
        if (!condition) {
          input.classList.add('is-invalid');
          if (errorEl) errorEl.classList.add('visible');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          if (errorEl) errorEl.classList.remove('visible');
        }
      }

      // Name validation
      checkField(nameInput, 'name-error', nameInput.value.trim().length > 1);

      // Email validation (RFC 5322 regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      checkField(emailInput, 'email-error', emailRegex.test(emailInput.value.trim()));

      // Subject validation
      checkField(subjectInput, 'subject-error', subjectInput.value.trim().length > 2);

      // Message validation
      checkField(messageInput, 'message-error', messageInput.value.trim().length > 5);

      if (!isValid) {
        formStatusAlert.className = 'form-status-alert alert-error';
        formStatusAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please fill in all required fields with valid information.';
        return;
      }

      // Preparing feedback before handing off to Gmail
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening Gmail...';

      setTimeout(() => {
        const senderName = nameInput.value.trim();
        const senderEmail = emailInput.value.trim();
        const subjectVal = subjectInput.value.trim();
        const messageVal = messageInput.value.trim();

        const recipient = 'badrkhaledghareeb.3tel@gmail.com';
        const mailSubject = `[Portfolio] ${subjectVal}`;
        const mailBody =
          `Name: ${senderName}\n` +
          `Email: ${senderEmail}\n\n` +
          `${messageVal}`;

        // Gmail's own web compose URL — opens straight into Gmail (not a
        // generic mail chooser) when the user is signed in on desktop
        const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

        // Gmail's app-specific URL scheme — opens the Gmail app's compose
        // screen directly on iOS/Android instead of the generic mail chooser
        const gmailAppUrl = `googlegmail:///co?to=${encodeURIComponent(recipient)}&subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

        // Plain mailto fallback for devices without the Gmail app installed
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

        const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

        if (isMobile) {
          // Try the Gmail app first; if it isn't installed, nothing happens
          // and we quietly fall back to the system mail chooser a moment later
          window.location.href = gmailAppUrl;
          setTimeout(() => {
            window.location.href = mailtoUrl;
          }, 600);
        } else {
          // Desktop: open Gmail's compose window directly in a new tab
          window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
        }

        formStatusAlert.className = 'form-status-alert alert-success';
        formStatusAlert.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Thank you, ${escapeHtml(senderName)}!</strong><br>
          Gmail should now be opening with your message pre-filled — just hit send there.
          If nothing opened, use
          <a href="${gmailWebUrl}" target="_blank" rel="noopener noreferrer" class="text-cyan">Open in Gmail</a>
          or email directly at
          <a href="mailto:${recipient}" class="text-cyan">${recipient}</a>.
        `;

        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

        // Clear notification after 10s
        setTimeout(() => {
          formStatusAlert.className = 'form-status-alert';
          formStatusAlert.innerHTML = '';
        }, 10000);
      }, 500);
    });
  }

  // Quick XSS sanitization helper for output
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }

  /* ==========================================================================
     7. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
