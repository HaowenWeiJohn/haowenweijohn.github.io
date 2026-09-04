export type Publication = {
  slug: string
  title: string
  authors: string          // markdown: **bold** for owner, \* for equal contribution
  venue: string            // markdown — may contain a link
  year: number
  date: string             // ISO
  abstract: string
  role?: string
  advisors?: string[]
  awards?: string[]
  links?: {
    pdf?: string
    video?: string
    code?: string
    dataset?: string
    slides?: string
    arxiv?: string
    external?: string
  }
  teaser?: string
}

export const publications: Publication[] = [
  {
    slug: 'qoq-med3',
    title: 'QoQ-Med3: A Multimodal Reasoning Foundation Model for Clinical Analysis',
    authors: 'David Dai, Jeannie She, Jiaee Cheong, Xing Han, Carl Harris, **Haowen Wei**, Farzan Vahedifard, Suchi Saria, Robert Stevens, Paul Liang',
    venue: 'npj Digital Medicine, 2026',
    year: 2026,
    date: '2026-07-25',
    abstract:
      'Multimodal reasoning-based foundation models (MRFMs) hold considerable promise for clinical practice, yet their readiness for real-world deployment remains insufficiently explored. We develop two MRFMs, QoQ-Med3 and QoQ-Med3-MIMIC, and systematically evaluate their generalizability to unseen clinical modalities and tasks, transferability to held-out datasets from different clinical sites, and robustness to cross-site heterogeneity. QoQ-Med3 achieves an overall balanced accuracy of 71.3% and an F1 of 0.349, surpassing all open-source and closed-source models including GPT-4o, with especially pronounced gains in understudied modalities such as ultrasound and mammography, while reducing extrinsic hallucination rates by 44.4% after training. Trained on public clinical data only, the model generalizes to both the held-out MIMIC-IV and the private JHU PMAP dataset collected at Johns Hopkins University Hospital.',
    links: {
      pdf: '/files/publications/2026-QoQ-Med3.pdf',
      code: 'https://github.com/DDVD233/qoq_med3',
      external: 'https://www.nature.com/articles/s41746-026-02945-3',
    },
    teaser: '/images/publications/QoQ-Med3.png',
  },
  {
    slug: 'climb',
    title: 'CLIMB: Data Foundations for Large Scale Multimodal Clinical Foundation Models',
    authors: 'Wei Dai, Peilin Chen, Malinda Lu, Daniel Li, **Haowen Wei**, Hejie Cui, Paul Pu Liang',
    venue: 'Proceedings of the 42nd International Conference on Machine Learning (ICML 2025)',
    year: 2025,
    date: '2025-07-15',
    abstract:
      'Recent advances in clinical AI have enabled remarkable progress across many clinical domains, but existing benchmarks and models are largely limited to a narrow set of modalities and tasks. We introduce the Clinical Large-Scale Integrative Multimodal Benchmark (CLIMB), a comprehensive benchmark unifying imaging, language, temporal, and graph modalities — 4.51 million patient samples totaling 19.01 TB spanning 2D imaging, 3D video, time series, graphs, and multimodal data — enabling training and evaluation of large-scale multimodal clinical foundation models.',
    links: {
      pdf: '/files/publications/2025-CLIMB.pdf',
      arxiv: 'https://arxiv.org/abs/2503.07667',
      external: 'https://icml.cc/virtual/2025/poster/45167',
    },
    teaser: '/images/publications/CLIMB.png',
  },
  {
    slug: 'glaucoma-vit',
    title: 'Interactively Assisting Glaucoma Diagnosis with an Expert Knowledge-distilled Vision Transformer',
    authors: 'Ziheng Li\\*, **Haowen Wei**\\*, Kuang Sun, David Li, Leyi Cui, Steven Feiner, Kaveri Thakoor',
    venue: 'Extended Abstracts of the 2025 CHI Conference on Human Factors in Computing Systems (CHI EA \'25), Late-Breaking Work',
    year: 2025,
    date: '2024-08-14',
    abstract:
      'This project enhances glaucoma diagnosis using an expert knowledge-distilled Vision Transformer, providing AI-augmented insights to ophthalmologists. The system integrates deep learning with medical imaging to focus on key diagnostic features in retinal images, interactively highlighting areas of interest for improved diagnosis. Validated with a user study involving 15 ophthalmologists, the tool demonstrates the potential of AI in supporting clinical decision-making.',
    role: 'Project Lead, Lead Software Engineer, Experimenter, Co-First Author',
    advisors: ['Dr. Steven K. Feiner', 'Dr. Kaveri Thakoor'],
    links: {
      external: 'https://dl.acm.org/doi/10.1145/3706599.3719719',
      video: 'https://www.youtube.com/watch?v=1aznz690KXE',
    },
    teaser: '/images/publications/VirtualVitality-Demo.gif',
  },
  {
    slug: 'sweyepinch',
    title: 'SwEYEpinch: Exploring Intuitive, Efficient Text Entry for Extended Reality via Eye and Hand Tracking',
    authors: 'Ziheng "Leo" Li, Xichen He, Mengyuan "Millie" Wu, Zeyi Tong, **Haowen Wei**, Benjamin Yang, Steven Feiner, Paul Sajda',
    venue: 'Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems (CHI \'26)',
    year: 2026,
    date: '2026-04-01',
    abstract:
      'SwEYEpinch explores intuitive, efficient text entry for extended reality (XR) by combining eye tracking and hand tracking. Users look at letters in sequence and confirm selections via pinch gestures, enabling hands-free, keyboard-free input tailored to XR interaction.',
    advisors: ['Dr. Steven K. Feiner', 'Dr. Paul Sajda'],
    links: {
      external: 'https://dl.acm.org/doi/10.1145/3772318.3791820',
      arxiv: 'https://arxiv.org/abs/2604.03520',
    },
    teaser: '/images/publications/SwEYEpe-Demo.gif',
  },
  {
    slug: 'thesis',
    title: "Master's Thesis: From Brain–Computer Interfaces to AI-Enhanced Diagnostics — Developing Cutting-Edge Tools for Medical and Interactive Technologies",
    authors: '**Haowen Wei**, Steven K. Feiner, Paul Sajda, Kaveri Thakoor',
    venue: 'Columbia University',
    year: 2024,
    date: '2024-05-11',
    abstract:
      "My master's thesis advances brain-computer interfaces (BCI), human-computer interaction (HCI), and extended reality (XR) through three key projects. PhysioLabXR, an open-source Python platform, enables real-time multi-modal BCI/XR experiments. Interactively Assisting Glaucoma Diagnosis employs deep learning to support clinical decision-making. In Search for an Intuitive and Efficient Text-Entry in Mixed Reality (SwEYEpe) explores new text-entry methods in mixed reality. Together, these projects push the boundaries of HCI and BCI research.",
    advisors: ['Dr. Steven K. Feiner', 'Dr. Paul Sajda', 'Dr. Kaveri Thakoor'],
    links: {
      external: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=phrai3MAAAAJ&citation_for_view=phrai3MAAAAJ:Y0pCki6q_DkC',
      pdf: '/files/publications/2024-05-11-Thesis.pdf',
    },
    teaser: '/images/publications/columbia-engineering.png',
  },
  {
    slug: 'physiolabxr',
    title: 'PhysioLabXR: A Software Platform for Real-Time Multi-Modal Brain-Computer Interfaces and Extended Reality Experiments',
    authors: 'Ziheng Li\\*, **Haowen Wei**\\*, Ziwen Xie, Yunxiang Peng, June Pyo Suh, Steven Feiner, Paul Sajda',
    venue: 'Journal of Open Source Software, 8(90): 5854, 2023',
    year: 2023,
    date: '2024-09-11',
    abstract:
      'PhysioLabXR is a Python-based open-source software platform for neuroscience and HCI experiments, enabling real-time multi-modal physiological data processing. It supports EEG, fNIRS, and eye trackers with multi-stream visualization, real-time DSP, and experiment recording. Native support for Lab Streaming Layer (LSL) and ZeroMQ (ZMQ) makes integrating experimental pipelines seamless.',
    role: 'Co-Founder, Lead Software Engineer, Co-First Author',
    advisors: ['Dr. Steven K. Feiner', 'Dr. Paul Sajda'],
    links: {
      pdf: '/files/publications/2024-01-11-PhysioLabXR.pdf',
      code: 'https://github.com/PhysioLabXR/PhysioLabXR-Community',
      video: 'https://www.youtube.com/watch?v=IJpYk-y0O2g',
      external: 'https://joss.theoj.org/papers/10.21105/joss.05854',
    },
    teaser: '/images/publications/PhysioLabXR-fMRI-Demo.gif',
  },
  {
    slug: 'lidar-mos',
    title: 'Real-Time LiDAR Point-Cloud Moving Object Segmentation for Autonomous Driving',
    authors: 'Xing Xie, **Haowen Wei**, Yongjie Yang',
    venue: 'Sensors, 23(1): 547, 2023',
    year: 2023,
    date: '2022-12-29',
    abstract:
      'We propose a lightweight CNN architecture for LiDAR point-cloud moving object segmentation targeting real-time autonomous driving. The network reduces computational burden with 66% fewer parameters than the state-of-the-art and achieves real-time processing speeds on GPU and FPGA. Our system achieves 51.3% IoU on SemanticKITTI and meets autonomous-vehicle real-time requirements with 32 fps on FPGA.',
    role: 'Lead Software Engineer',
    links: {
      pdf: '/files/publications/2022-12-29-LiDAR.pdf',
      dataset: 'https://www.semantic-kitti.org/',
      external: 'https://www.mdpi.com/1424-8220/23/1/547',
    },
    teaser: '/images/publications/2022-12-29-Lidar-Teaser.png',
  },
  {
    slug: 'proximity',
    title: 'Proximity Detection During Epidemics: Direct UWB TOA Versus Machine Learning Based RSSI',
    authors: 'Zhuoran Su, Kaveh Pahlavan, Emmanuel Agu, **Haowen Wei**',
    venue: 'International Journal of Wireless Information Networks, 29(4): 480–490, 2022',
    year: 2022,
    date: '2022-10-14',
    abstract:
      'This study compares proximity-detection performance of UWB TOA and machine-learning-based BLE RSSI during epidemics. UWB TOA achieves slightly higher accuracy with less computational complexity; BLE RSSI requires extensive training for similar results. We evaluate both technologies in LOS and OLOS environments and across postures to assess robustness for social-distancing applications.',
    role: 'Software Engineer',
    advisors: ['Dr. Kaveh Pahlavan', 'Dr. Emmanuel Agu'],
    links: {
      pdf: '/files/publications/2022-10-14-Proximity.pdf',
      external: 'https://link.springer.com/article/10.1007/s10776-022-00577-4',
    },
    teaser: '/images/publications/2022-10-14-Proximity-Teaser.png',
  },
  {
    slug: 'indexpen',
    title: 'IndexPen: Two-Finger Text Input with Millimeter-Wave Radar',
    authors: '**Haowen Wei**\\*, Ziheng Li\\*, Alexander D. Galvan, Zhuoran Su, Xiao Zhang, Kaveh Pahlavan, Erin T. Solovey',
    venue: 'Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies (IMWUT), 6(2): 1–39, 2022',
    year: 2022,
    date: '2023-07-07',
    abstract:
      'IndexPen introduces a novel interaction technique for touch-free text input using two-finger in-air micro-gestures. It uses mmWave radar to recognize 30 distinct gestures (A-Z, Space, Backspace, Enter) plus a noise class. Over a 10-day study with five participants the system achieved 95.89% cross-validation accuracy across 31 classes; in a follow-up with 16 new participants, sentence-typing accuracy reached 86.2%.',
    role: 'Project Lead, Lead Software Engineer, First Author',
    advisors: ['Dr. Erin Solovey', 'Dr. Kaveh Pahlavan'],
    awards: ['2022 Best Undergraduate Major Qualifying Project at WPI, 3rd Place'],
    links: {
      pdf: '/files/publications/2022-07-07-IndexPen.pdf',
      video: 'https://www.youtube.com/watch?v=k_DA7Dgi5KY',
      dataset: 'https://www.kaggle.com/datasets/haowenjohnwei/indexpen-user-study',
      external: 'https://dl.acm.org/doi/10.1145/3534601',
    },
    teaser: '/images/publications/IndexPen-Demo.gif',
  },
  {
    slug: 'mmwave-interference',
    title: 'A Study of Interference Analysis Between mmWave Radars and IEEE 802.11 AD at 60 GHz Bands',
    authors: 'Shiyu Cheng, Kaveh Pahlavan, **Haowen Wei**, Zhuoran Su, Seyed Reza Zekavat, Ali Abedi',
    venue: 'International Journal of Wireless Information Networks, 29(3): 222–231, 2022',
    year: 2022,
    date: '2022-09-15',
    abstract:
      'This study presents an empirical analysis of mutual interference between IEEE 802.11ad communication and mmWave radar in the 60 GHz band. It examines impact on radar coverage and precision and models the effect on packet-loss rates in wireless communication, providing practical insight into coexistence design.',
    role: 'Lead Software Engineer',
    advisors: ['Dr. Kaveh Pahlavan', 'Dr. Seyed Zekavat'],
    links: {
      pdf: '/files/publications/2022-05-16-Interference.pdf',
      external: 'https://link.springer.com/article/10.1007/s10776-022-00564-9',
    },
    teaser: '/images/publications/2022-05-16-Interference-Teaser.png',
  },
]
