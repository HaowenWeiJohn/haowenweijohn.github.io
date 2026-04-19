export type Project = {
  slug: string            // matches publication slug where applicable
  title: string
  blurb: string
  tags: string[]
  media: { src: string; alt: string }
  links?: {
    publication?: string  // e.g. "/publications#indexpen"
    video?: string
    code?: string
    demo?: string
    paper?: string
  }
}

export const projects: Project[] = [
  {
    slug: 'indexpen',
    title: 'IndexPen',
    blurb: 'Two-finger in-air text input via millimeter-wave radar — 30 gestures, 95.89% accuracy.',
    tags: ['mmWave', 'Gesture', 'HCI', 'Deep Learning'],
    media: { src: '/images/publications/IndexPen-Demo.gif', alt: 'IndexPen demo' },
    links: {
      publication: '/publications#indexpen',
      video: 'https://www.youtube.com/watch?v=k_DA7Dgi5KY',
      paper: '/files/publications/2022-07-07-IndexPen.pdf',
    },
  },
  {
    slug: 'physiolabxr',
    title: 'PhysioLabXR',
    blurb: 'Open-source Python platform for real-time multi-modal BCI and XR experiments — EEG, fNIRS, eye tracking, LSL.',
    tags: ['BCI', 'XR', 'Open Source', 'Python'],
    media: { src: '/images/publications/PhysioLabXR-fMRI-Demo.gif', alt: 'PhysioLabXR demo' },
    links: {
      publication: '/publications#physiolabxr',
      code: 'https://github.com/PhysioLabXR/PhysioLabXR-Community',
      video: 'https://www.youtube.com/watch?v=IJpYk-y0O2g',
    },
  },
  {
    slug: 'glaucoma-vit',
    title: 'Glaucoma Diagnosis with Expert Knowledge-Distilled Vision Transformer',
    blurb: 'AI-augmented diagnostic tool for glaucoma, validated with 15 ophthalmologists.',
    tags: ['Vision', 'Clinical AI', 'User Study'],
    media: { src: '/images/publications/VirtualVitality-Demo.gif', alt: 'Glaucoma diagnosis demo' },
    links: {
      publication: '/publications#glaucoma-vit',
      video: 'https://www.youtube.com/watch?v=1aznz690KXE',
    },
  },
  {
    slug: 'sweyepe',
    title: 'SwEYEpe — Efficient Text-Entry in Mixed Reality',
    blurb: 'Multi-modal text entry in MR using tap, gaze, and pinch — gaze-path swipe with language-model matching.',
    tags: ['XR', 'Eye Tracking', 'HCI'],
    media: { src: '/images/publications/SwEYEpe-Demo.gif', alt: 'SwEYEpe demo' },
    links: {
      publication: '/publications#sweyepe',
    },
  },
  {
    slug: 'lidar-mos',
    title: 'Real-Time LiDAR Point-Cloud Moving Object Segmentation',
    blurb: 'Lightweight CNN with 66% fewer parameters than SOTA, 32 fps on FPGA, 51.3% IoU on SemanticKITTI.',
    tags: ['LiDAR', 'Segmentation', 'Autonomous Driving', 'FPGA'],
    media: { src: '/images/publications/2022-12-29-Lidar-Teaser.png', alt: 'LiDAR segmentation teaser' },
    links: {
      publication: '/publications#lidar-mos',
      paper: '/files/publications/2022-12-29-LiDAR.pdf',
    },
  },
  {
    slug: 'proximity',
    title: 'Proximity Detection During Epidemics',
    blurb: 'UWB TOA vs ML-enhanced BLE RSSI — accuracy, complexity, and robustness in LOS/OLOS scenarios.',
    tags: ['UWB', 'BLE', 'Wireless Sensing'],
    media: { src: '/images/publications/2022-10-14-Proximity-Teaser.png', alt: 'Proximity detection teaser' },
    links: {
      publication: '/publications#proximity',
      paper: '/files/publications/2022-10-14-Proximity.pdf',
    },
  },
  {
    slug: 'mmwave-interference',
    title: 'mmWave Radar × IEEE 802.11ad Interference Analysis',
    blurb: 'Empirical study of 60 GHz mutual interference between radar and Wi-Fi — coverage, precision, packet loss.',
    tags: ['mmWave', 'Wi-Fi', 'RF'],
    media: { src: '/images/publications/2022-05-16-Interference-Teaser.png', alt: 'mmWave interference teaser' },
    links: {
      publication: '/publications#mmwave-interference',
      paper: '/files/publications/2022-05-16-Interference.pdf',
    },
  },
]
