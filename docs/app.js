/* Project facts are kept with their evidence and original repository links. */
(() => {
  "use strict";
  const projects = [
  {
    "accent": "lime",
    "approach": [
      "Deneyleri; veri, donanım, bütçe, metrik ve asıl kaynak bağlantılarıyla ortak bir arşivde topluyorum.",
      "Organizing experiments around data, hardware, budgets, metrics and original source links."
    ],
    "cats": [
      "ai"
    ],
    "description": [
      "Modellerin arkasındaki hikâye: veri, bütçe, yöntem ve ölçülebilir sonuçlar.",
      "The story behind the models: data, budgets, methods and measurable results."
    ],
    "evidence": [
      "Bigg 50M tek-seed pilotunda, 600 saniyelik eşit bütçede JEPA-off test PPL 272,56; legacy JEPA 342,90. Sonuç yalnızca bu koşullardaki karşılaştırmayı destekliyor.",
      "In a single-seed Bigg 50M pilot with equal 600-second budgets, JEPA-off test PPL was 272.56 versus 342.90 for legacy JEPA. This result supports only this comparison under these conditions."
    ],
    "id": "results",
    "label": [
      "DENEY ARŞİVİ",
      "EXPERIMENT ARCHIVE"
    ],
    "number": "01",
    "problem": [
      "Dağınık model eğitimlerini ve sonuçlarını birlikte değerlendirmek.",
      "Bringing scattered model training runs and their results into one view."
    ],
    "repo": "model-training-results",
    "tags": [
      "LLM",
      "Benchmarks",
      "Python"
    ],
    "title": "Model Training Results"
  },
  {
    "accent": "aqua",
    "approach": [
      "Türkçe Wikipedia metinleriyle Byte-Level BPE tabanlı, 128.000 öğeli bir sözlük eğitildi.",
      "A 128,000-entry Byte-Level BPE vocabulary was trained on Turkish Wikipedia text."
    ],
    "cats": [
      "nlp"
    ],
    "description": [
      "Türkçe metni modelin anlayacağı parçalara dönüştüren 128 bin öğelik BPE sözlüğü.",
      "A 128k-entry BPE vocabulary that turns Turkish text into model-ready tokens."
    ],
    "evidence": [
      "Eğitilmiş tokenizer dosyası ve Python kullanım örneği mevcut. Karşılaştırmalı kalite veya hız benchmarkı henüz yok.",
      "A trained tokenizer file and a Python usage example are available. No comparative quality or speed benchmark is available yet."
    ],
    "id": "tokenizer",
    "label": [
      "TÜRKÇE DOĞAL DİL İŞLEME",
      "TURKISH NLP"
    ],
    "number": "02",
    "problem": [
      "Türkçe metinleri dil modeli çalışmalarında kullanmak üzere tokenize etmek.",
      "Tokenizing Turkish text for language-model experiments."
    ],
    "repo": "TurkishTokenizer",
    "tags": [
      "Python",
      "Tokenizers",
      "BPE"
    ],
    "title": "TurkishTokenizer"
  },
  {
    "accent": "violet",
    "approach": [
      "ModernLLM mimarisi ve trainer kodu; Qwen LoRA/QLoRA reçeteleri ve farklı eğitim denemeleri.",
      "ModernLLM architecture and trainer code, Qwen LoRA/QLoRA recipes and training experiments."
    ],
    "cats": [
      "ai",
      "nlp"
    ],
    "description": [
      "Decoder-only Transformer mimarisi, PyTorch eğitimleri ve Qwen fine-tuning çalışmaları.",
      "Decoder-only Transformer architecture, PyTorch training and Qwen fine-tuning experiments."
    ],
    "evidence": [
      "ModernLLM H100 koşuları kısmi. Kod ve ara artefaktlar mevcut; tamamlanmış, temiz bir nihai benchmark sunulmuyor.",
      "ModernLLM H100 runs are partial. Code and intermediate artifacts exist; no completed, clean final benchmark is claimed."
    ],
    "id": "modernllm",
    "label": [
      "MİMARİ & EĞİTİM",
      "ARCHITECTURE & TRAINING"
    ],
    "number": "03",
    "problem": [
      "Dil modellerinin mimarisini ve eğitim sürecini uygulayarak anlamak.",
      "Understanding language-model architecture and training through implementation."
    ],
    "repo": "yapay-zeka-sistemi",
    "tags": [
      "PyTorch",
      "LLM",
      "Qwen"
    ],
    "title": "LLM deneyleri",
    "titleEn": "LLM experiments"
  },
  {
    "accent": "blue",
    "approach": [
      "Veri toplama, enflasyon karşılaştırmaları ve teknik göstergeler Streamlit arayüzünde birleştirildi.",
      "Data collection, inflation comparisons and technical indicators are brought together in a Streamlit interface."
    ],
    "cats": [
      "apps"
    ],
    "description": [
      "Piyasa verisini, enflasyon karşılaştırmalarını ve teknik göstergeleri bir araya getiren panel.",
      "A dashboard bringing together market data, inflation comparisons and technical indicators."
    ],
    "evidence": [
      "Uygulama kodu ve kurulum adımları repoda. Piyasa verilerinin, enflasyon karşılaştırmalarının ve teknik göstergelerin incelenmesine odaklanır.",
      "Application code and setup instructions are in the repository. It focuses on exploring market data, inflation comparisons and technical indicators."
    ],
    "id": "finapp",
    "label": [
      "VERİ & UYGULAMA",
      "DATA & APPLICATIONS"
    ],
    "number": "04",
    "problem": [
      "Farklı finansal veri kaynaklarını birlikte incelemek.",
      "Exploring different financial data sources together."
    ],
    "repo": "FinApp",
    "tags": [
      "Streamlit",
      "Python",
      "SQLite"
    ],
    "title": "FinApp"
  },
  {
    "accent": "sky",
    "approach": [
      "Türkiye odaklı başlangıç noktaları, iniş akışı, telemetri, ayarlar ve arazi yüksekliği sorguları üzerinde çalışıldı.",
      "Work includes Turkey-focused spawn presets, a landing flow, telemetry, configuration and terrain-height queries."
    ],
    "cats": [
      "apps"
    ],
    "description": [
      "Uçuş, coğrafi veri ve telemetriyi buluşturan tarayıcı simülatörü uyarlaması.",
      "A browser simulator adaptation combining flight, geospatial data and telemetry."
    ],
    "evidence": [
      "Dimar Tarmizi'nin özgün Web Flight Simulator projesinin bağımsız uyarlamasıdır. Özgün simülatörün yazarlığı ve lisansı upstream projeye aittir.",
      "An independently maintained adaptation of Dimar Tarmizi's original Web Flight Simulator. Authorship of the original simulator and its license belong to the upstream project."
    ],
    "id": "flight",
    "label": [
      "TARAYICIDA 3D",
      "BROWSER-BASED 3D"
    ],
    "number": "05",
    "problem": [
      "Var olan bir uçuş deneyimini coğrafi veri ve oynanış iyileştirmeleriyle geliştirmek.",
      "Extending an existing flight experience with geospatial and gameplay improvements."
    ],
    "repo": "web-flight-simulator",
    "tags": [
      "Three.js",
      "CesiumJS",
      "Vite"
    ],
    "title": "Web Flight Simulator"
  },
  {
    "accent": "orange",
    "approach": [
      "Car Evaluation verisi üzerinde yedi sınıflandırma algoritması; değerlendirme ve görselleştirme.",
      "Seven classification algorithms on Car Evaluation data, with evaluation and visualization."
    ],
    "cats": [
      "ai",
      "apps"
    ],
    "description": [
      "Araç kabul edilebilirliğini tahmin etmek için yedi sınıflandırma algoritmasının karşılaştırması.",
      "Comparing seven classification algorithms for car acceptability prediction."
    ],
    "evidence": [
      "Deney arşivinde Decision Tree için %98,55 test doğruluğu kayıtlı. Bu değer ilgili veri kümesi ve değerlendirme düzenine aittir.",
      "The experiment archive records 98.55% test accuracy for Decision Tree. This value applies to that dataset and evaluation setup."
    ],
    "id": "car",
    "label": [
      "UYGULAMALI MAKİNE ÖĞRENMESİ",
      "APPLIED MACHINE LEARNING"
    ],
    "number": "06",
    "problem": [
      "Bir sınıflandırma probleminde farklı modellerin sonuçlarını karşılaştırmak.",
      "Comparing different models on a classification problem."
    ],
    "repo": "car-evaluation-ml",
    "tags": [
      "scikit-learn",
      "Flask",
      "Plotly"
    ],
    "title": "Car Evaluation ML"
  },
  {
    "accent": "pink",
    "approach": [
      "Android odaklı uygulama ve FFmpeg ile medya işleme çalışmaları.",
      "Android-oriented application work and media processing with FFmpeg."
    ],
    "cats": [
      "apps"
    ],
    "description": [
      "Android odaklı, yerel video ve fotoğraf büyütme üzerine bir medya işleme projesi.",
      "An Android-focused media-processing project for local video and photo upscaling."
    ],
    "evidence": [
      "Android odaklı uygulama kaynakları ve yerel medya işleme çalışmaları repoda incelenebilir.",
      "Android-oriented application sources and local media-processing work can be explored in the repository."
    ],
    "id": "video",
    "label": [
      "MEDYA İŞLEME",
      "MEDIA PROCESSING"
    ],
    "number": "07",
    "problem": [
      "Video ve fotoğraflar üzerinde yerel medya işleme akışları oluşturmak.",
      "Creating local media-processing workflows for video and photos."
    ],
    "repo": "video-upscaler",
    "tags": [
      "Android",
      "FFmpeg",
      "Media"
    ],
    "title": "Video Upscaler"
  },
  {
    "accent": "sand",
    "approach": [
      "nanochat uyarlaması, CPU odaklı presetler ve küçük eğitim denemeleri.",
      "A nanochat adaptation, CPU-focused presets and small training experiments."
    ],
    "cats": [
      "ai"
    ],
    "description": [
      "Windows ve CPU ortamına odaklanan nanochat uyarlaması ve yerel eğitim denemeleri.",
      "A Windows CPU-focused nanochat adaptation and local training experiments."
    ],
    "evidence": [
      "Arşivdeki sonuçlar kaynak README'ye dayalı self-reported olarak etiketleniyor; ham loglarla ayrıca doğrulanmış benchmark sayılmıyor.",
      "Archived results are labeled self-reported from the source README, rather than independently verified benchmarks backed by raw logs."
    ],
    "id": "nanochat",
    "label": [
      "YEREL MODEL DENEYLERİ",
      "LOCAL MODEL EXPERIMENTS"
    ],
    "number": "08",
    "problem": [
      "Yerel model eğitimini Windows ve CPU ortamında incelemek.",
      "Exploring local model training in a Windows CPU environment."
    ],
    "repo": "nanochat-windows-cpu",
    "tags": [
      "Python",
      "PyTorch",
      "CPU"
    ],
    "title": "nanochat · Windows CPU"
  }
];
  const profileUrl = "https://github.com/cebrailbagatarhan";
  const root = document.documentElement;
  const languageButton = document.getElementById("language-toggle");
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  const dialog = document.getElementById("project-dialog");
  const cards = [...document.querySelectorAll(".project-card")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  const metricButtons = [...document.querySelectorAll("[data-metric]")];
  let language = "tr";
  let activeFilter = "all";
  let metric = "ppl";
  let selectedProject = null;
  let menuOpen = false;

  try {
    if (localStorage.getItem("cebrail-portfolio-language") === "en") language = "en";
  } catch (_) { /* The page also works when browser storage is unavailable. */ }

  const pick = (pair) => pair[language === "tr" ? 0 : 1];
  const number = (value, digits = 2) => new Intl.NumberFormat(
    language === "tr" ? "tr-TR" : "en-US",
    { minimumFractionDigits: digits, maximumFractionDigits: digits }
  ).format(value);

  function setMenu(open, returnFocus = false) {
    menuOpen = open;
    nav.dataset.open = String(open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", pick(open
      ? ["Menüyü kapat", "Close menu"] : ["Menüyü aç", "Open menu"]));
    if (returnFocus) menuButton.focus();
  }

  function filterProjects() {
    let count = 0;
    cards.forEach((card) => {
      const visible = activeFilter === "all" || card.dataset.categories.split(" ").includes(activeFilter);
      card.hidden = !visible;
      if (visible) count += 1;
    });
    filters.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter)));
    document.querySelector(".project-grid").classList.toggle("is-filtered", activeFilter !== "all");
    document.getElementById("project-count").textContent = language === "tr"
      ? count + " proje gösteriliyor" : count + " projects shown";
  }

  function renderMetric() {
    const isPpl = metric === "ppl";
    const off = isPpl ? 272.563981 : 8584.66;
    const legacy = isPpl ? 342.901316 : 6607.76;
    const max = Math.max(off, legacy);
    document.getElementById("off-value").textContent = number(off);
    document.getElementById("legacy-value").textContent = number(legacy);
    document.getElementById("off-bar").style.width = (off / max * 100).toFixed(4) + "%";
    document.getElementById("legacy-bar").style.width = (legacy / max * 100).toFixed(4) + "%";
    document.getElementById("metric-heading").textContent = pick(isPpl
      ? ["Test perplexity · düşük daha iyi", "Test perplexity · lower is better"]
      : ["Token/s · yüksek daha iyi", "Tokens/s · higher is better"]);
    const difference = (isPpl ? legacy - off : off - legacy) / legacy * 100;
    document.getElementById("metric-difference").textContent = language === "tr"
      ? "%" + number(difference, 1) : number(difference, 1) + "%";
    document.getElementById("metric-explanation").textContent = pick(isPpl
      ? ["daha düşük test perplexity", "lower test perplexity"]
      : ["daha yüksek token/s", "higher tokens per second"]);
    metricButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.metric === metric)));
  }

  function renderProject() {
    if (!selectedProject) return;
    const p = selectedProject;
    document.getElementById("dialog-label").textContent = p.number + " / " + pick(p.label);
    document.getElementById("dialog-title").textContent = language === "en" && p.titleEn ? p.titleEn : p.title;
    for (const key of ["description", "problem", "approach", "evidence"]) {
      document.getElementById("dialog-" + key).textContent = pick(p[key]);
    }
    document.getElementById("dialog-repo").href = profileUrl + "/" + p.repo;
  }

  function applyLanguage() {
    root.lang = language;
    document.querySelectorAll("[data-tr][data-en]").forEach((node) => {
      node.textContent = node.dataset[language];
    });
    document.querySelectorAll("[data-aria-tr][data-aria-en]").forEach((node) => {
      node.setAttribute("aria-label", node.getAttribute("data-aria-" + language));
    });
    languageButton.textContent = language === "tr" ? "EN" : "TR";
    languageButton.lang = language === "tr" ? "en" : "tr";
    languageButton.setAttribute("aria-label", language === "tr" ? "Switch to English" : "Türkçeye geç");
    document.title = pick([
      "Cebrail Bağatarhan — AI, Türkçe NLP & Yazılım",
      "Cebrail Bağatarhan — AI, Turkish NLP & Software"
    ]);
    document.querySelector('meta[name="description"]').content = pick([
      "Cebrail Bağatarhan'ın kişisel portföyü. Yapay zekâ deneyleri, Türkçe NLP araçları ve açık kaynak yazılım projeleri.",
      "Cebrail Bağatarhan's portfolio. AI experiments, Turkish NLP tools and open-source software projects."
    ]);
    document.getElementById("copy-status").textContent = "";
    setMenu(menuOpen);
    filterProjects();
    renderMetric();
    renderProject();
  }

  languageButton.addEventListener("click", () => {
    language = language === "tr" ? "en" : "tr";
    try { localStorage.setItem("cebrail-portfolio-language", language); } catch (_) {}
    applyLanguage();
  });
  menuButton.addEventListener("click", () => setMenu(!menuOpen));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOpen) setMenu(false, true);
  });
  const desktop = window.matchMedia("(min-width: 821px)");
  desktop.addEventListener("change", (event) => { if (event.matches) setMenu(false); });

  filters.forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterProjects();
  }));
  metricButtons.forEach((button) => button.addEventListener("click", () => {
    metric = button.dataset.metric;
    renderMetric();
  }));

  if (typeof dialog.showModal === "function") {
    document.querySelectorAll("[data-detail]").forEach((button) => {
      button.hidden = false;
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", "project-dialog");
      button.addEventListener("click", () => {
        selectedProject = projects.find((p) => p.id === button.dataset.detail);
        if (!selectedProject) return;
        renderProject();
        dialog.showModal();
        document.body.classList.add("modal-open");
      });
    });
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      selectedProject = null;
    });
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  }

  const copyButton = document.getElementById("copy-profile");
  copyButton.addEventListener("click", async () => {
    copyButton.disabled = true;
    try {
      await navigator.clipboard.writeText(profileUrl);
      document.getElementById("copy-status").textContent = pick(["Profil bağlantısı kopyalandı.", "Profile link copied."]);
    } catch (_) {
      document.getElementById("copy-status").textContent = pick([
        "Kopyalanamadı. Profil adresi: ", "Could not copy. Profile URL: "
      ]) + profileUrl;
    } finally { copyButton.disabled = false; }
  });

  applyLanguage();
  document.getElementById("year").textContent = String(new Date().getFullYear());
  root.classList.add("enhanced");
  languageButton.hidden = false;
  menuButton.hidden = false;
  copyButton.hidden = false;
  document.querySelector(".project-toolbar").hidden = false;
  document.querySelector(".metric-controls").hidden = false;
})();
