export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  sub: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  microTrust: string[];
  ribbonStrip: string;
}

export interface MarqueeContent {
  label: string;
  colleges: string[];
}

export interface ProblemContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  chips: string[];
  centralNode: string;
  principles: {
    title: string;
    description: string;
  }[];
}

export interface RoleCard {
  id: string;
  roleLabel: string;
  descriptor: string;
  icon: 'ShieldCheck' | 'GraduationCap' | 'Building2';
  title: string;
  body: string;
}

export interface RolesContent {
  eyebrow: string;
  title: string;
  body: string;
  cards: RoleCard[];
  bottomBand: {
    role: string;
    text: string;
  }[];
}

export interface FlowStep {
  stepNumber: string;
  name: string;
  description: string;
  expandable?: boolean;
  actions?: {
    label: string;
    description: string;
    status: 'ok' | 'danger' | 'warn';
  }[];
}

export interface FlowContent {
  eyebrow: string;
  title: string;
  body: string;
  steps: FlowStep[];
  timelineMock: {
    label: string;
    status: 'completed' | 'active' | 'pending';
  }[];
}

export interface GovernanceContent {
  eyebrow: string;
  title: string;
  body: string;
  enforcementTable: {
    layer: string;
    rule: string;
  }[];
  statements: string[];
  callout: string;
}

export interface PortalTab {
  id: 'society' | 'ambassador' | 'admin';
  label: string;
  headerLine: string;
  checklist: string[];
  note?: string;
}

export interface PortalsContent {
  eyebrow: string;
  title: string;
  tabs: PortalTab[];
}

export interface CapabilityItem {
  icon: 'SquareUser' | 'Building' | 'FilePlus2' | 'GitPullRequestArrow' | 'Zap' | 'Activity' | 'Bell' | 'ScrollText' | 'Radio' | 'Network';
  title: string;
  description: string;
}

export interface CapabilitiesContent {
  eyebrow: string;
  title: string;
  body: string;
  items: CapabilityItem[];
}

export interface ImpactStat {
  token: string;
  targetNum: number;
  suffix?: string;
  label: string;
  isPlaceholderToken: boolean;
}

export interface ImpactContent {
  title: string;
  body: string;
  stats: ImpactStat[];
  quote: string;
}

export interface CTAColumn {
  audience: string;
  label: string;
  href: string;
  isStub?: boolean;
  isExternal?: boolean;
}

export interface CTAContent {
  eyebrow: string;
  title: string;
  body: string;
  columns: CTAColumn[];
  tagline: string;
}

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface FooterContent {
  brand: string;
  badge: string;
  positioning: string;
  columns: FooterColumn[];
  copyright: string;
  tagline: string;
}

export interface ContentData {
  nav: {
    brand: string;
    badge: string;
    links: NavLink[];
    ctaSecondary: { label: string; href: string };
    ctaPrimary: { label: string; href: string };
  };
  hero: HeroContent;
  marquee: MarqueeContent;
  problem: ProblemContent;
  roles: RolesContent;
  flow: FlowContent;
  governance: GovernanceContent;
  portals: PortalsContent;
  capabilities: CapabilitiesContent;
  impact: ImpactContent;
  cta: CTAContent;
  footer: FooterContent;
}

export const content: ContentData = {
  nav: {
    brand: 'SkillLinkr',
    badge: 'OMS',
    links: [
      { label: 'How it works', href: '#flow' },
      { label: 'Roles', href: '#roles' },
      { label: 'Governance', href: '#governance' },
      { label: 'Portals', href: '#portals' },
      { label: 'Capabilities', href: '#capabilities' },
    ],
    ctaSecondary: { label: 'Sign in', href: 'https://oms.skilllinkr.com' },
    ctaPrimary: { label: 'List an opportunity', href: '#cta' },
  },

  hero: {
    eyebrow: 'CAMPUS OPPORTUNITY INFRASTRUCTURE — oms.skilllinkr.com',
    title: 'One Platform for Every *Campus* Opportunity.',
    sub: 'SkillLinkr OMS brings Societies, Campus Ambassadors, and Administrators into one structured workflow — so campus opportunities can be submitted, verified, managed, and published with confidence.',
    ctaPrimary: { label: 'List an opportunity', href: '#cta' },
    ctaSecondary: { label: 'See how it works', href: '#flow' },
    microTrust: [
      'College-scoped verification',
      'Approve, reject, or request corrections',
      'Automatic publish on approval',
    ],
    ribbonStrip: 'SUBMIT → VERIFY → PUBLISH → DISCOVER',
  },

  marquee: {
    label: 'EXPANDING ACROSS COLLEGES',
    colleges: [
      '{{COLLEGE_01}}',
      '{{COLLEGE_02}}',
      '{{COLLEGE_03}}',
      '{{COLLEGE_04}}',
      '{{COLLEGE_05}}',
      '{{COLLEGE_06}}',
      '{{COLLEGE_07}}',
      '{{COLLEGE_08}}',
      '{{COLLEGE_09}}',
      '{{COLLEGE_10}}',
    ],
  },

  problem: {
    eyebrow: '',
    title: "Campus opportunities don't fail. They *fragment*.",
    paragraphs: [
      'Student opportunities are often scattered across WhatsApp groups, Instagram posts, posters, email chains, forms, and individual society pages. This makes discovery inconsistent and verification difficult.',
      'OMS turns that fragmented process into one accountable publishing workflow.',
    ],
    chips: [
      'WhatsApp',
      'Instagram',
      'Posters',
      'Email chains',
      'Forms',
      'Society pages',
      'DMs',
    ],
    centralNode: 'One publishing workflow',
    principles: [
      {
        title: 'TRUST',
        description: 'Create a verification layer before an opportunity reaches students.',
      },
      {
        title: 'STRUCTURE',
        description: 'Replace scattered manual coordination with a clear submission and review workflow.',
      },
      {
        title: 'SCALE',
        description: 'Allow SkillLinkr to expand across colleges without central Admins manually reviewing every listing.',
      },
    ],
  },

  roles: {
    eyebrow: '',
    title: 'One system. *Three* responsibilities.',
    body: 'Each role has a clear responsibility, and every opportunity stays associated with the college and society that submitted it.',
    cards: [
      {
        id: 'admin',
        roleLabel: 'ADMIN',
        descriptor: 'Global control',
        icon: 'ShieldCheck',
        title: 'Admin',
        body: 'Adds and manages Campus Ambassadors and societies, oversees colleges, monitors opportunities across the platform, and handles system-wide governance.',
      },
      {
        id: 'ambassador',
        roleLabel: 'CAMPUS AMBASSADOR',
        descriptor: 'College-level verifier',
        icon: 'GraduationCap',
        title: 'Campus Ambassador',
        body: 'Can manage societies and opportunities only for their own college. Reviews submissions, requests corrections, approves or rejects opportunities.',
      },
      {
        id: 'society',
        roleLabel: 'SOCIETY',
        descriptor: 'Opportunity creator',
        icon: 'Building2',
        title: 'Society',
        body: 'Creates and submits opportunities for its college, uploads full details and posters, tracks review status, responds to correction requests, and manages its own listings.',
      },
    ],
    bottomBand: [
      {
        role: 'For Societies:',
        text: 'List events, hackathons, competitions, recruitment drives, internships, workshops, and other opportunities through one dedicated portal.',
      },
      {
        role: 'For Campus Ambassadors:',
        text: 'Review and verify opportunities from your own college, request corrections when needed, and approve trusted listings for publication.',
      },
      {
        role: 'For Administrators:',
        text: 'Manage colleges, Ambassadors, societies, opportunities, analytics, governance, and the complete SkillLinkr opportunity network from one place.',
      },
    ],
  },

  flow: {
    eyebrow: '',
    title: 'A controlled *publishing chain*.',
    body: 'The OMS is designed around a simple, controlled publishing chain. Each role has a clear responsibility and every opportunity remains associated with the college and society that submitted it.',
    steps: [
      {
        stepNumber: '01',
        name: 'Society Creates',
        description:
          'A verified Society member fills the opportunity form with title, description, category, eligibility, dates, mode, venue, registration link, benefits, tags, and poster/image.',
      },
      {
        stepNumber: '02',
        name: 'Submit for Review',
        description:
          "The opportunity is submitted to the review queue for the Society's own college.",
      },
      {
        stepNumber: '03',
        name: 'Campus Ambassador Reviews',
        description:
          'The same-college Ambassador checks the information, preview, links, dates, organizer details, poster, and overall authenticity.',
      },
      {
        stepNumber: '04',
        name: 'Approve / Reject / Correct',
        description:
          'The Ambassador can approve, reject with a reason, or request corrections when information is incomplete or inaccurate.',
        expandable: true,
        actions: [
          {
            label: 'Approve',
            description: 'Publishes opportunity directly to student feed.',
            status: 'ok',
          },
          {
            label: 'Reject with reason',
            description: 'Provides definitive feedback explaining why listing is rejected.',
            status: 'danger',
          },
          {
            label: 'Request correction',
            description: 'Flags specific fields for society to revise and resubmit.',
            status: 'warn',
          },
        ],
      },
      {
        stepNumber: '05',
        name: 'Automatic Publication',
        description:
          'Once the authorized same-college Ambassador approves the opportunity, it is published without requiring a second normal Admin approval.',
      },
      {
        stepNumber: '06',
        name: 'Students Discover',
        description:
          "Published opportunities become available through SkillLinkr's opportunity experience and public OMS data layer.",
      },
    ],
    timelineMock: [
      { label: 'Draft', status: 'completed' },
      { label: 'Submitted', status: 'completed' },
      { label: 'In review', status: 'completed' },
      { label: 'Changes requested', status: 'active' },
      { label: 'Approved', status: 'pending' },
      { label: 'Published', status: 'pending' },
    ],
  },

  governance: {
    eyebrow: '',
    title: 'An Ambassador can only speak for *their* college.',
    body: 'College isolation is a core OMS principle. A Campus Ambassador is bound to a specific college and must not be able to review or manage opportunities belonging to another institution.',
    enforcementTable: [
      { layer: 'Identity', rule: 'Ambassador → College A binding, issued by Admin' },
      { layer: 'Interface', rule: 'Cross-college queues and actions are not rendered' },
      { layer: 'API / Server', rule: "Every query is scoped by the session's college claim" },
      { layer: 'Database / RLS', rule: 'Row-level policies block cross-college reads and writes' },
    ],
    statements: [
      'A KIIT Ambassador can manage KIIT societies and KIIT opportunities.',
      'The same Ambassador cannot review or approve an opportunity from VIT or another college.',
      'Admin retains global visibility and management access across colleges.',
    ],
    callout:
      'College access is enforced in the interface, API/server authorization, and database/RLS — not just hidden in the UI.',
  },

  portals: {
    eyebrow: '',
    title: 'Built for the person actually doing the work.',
    tabs: [
      {
        id: 'society',
        label: 'Society',
        headerLine:
          'The Society portal is the content-creation side of OMS. It should feel simple enough for a society representative to publish a professional opportunity without needing technical knowledge.',
        checklist: [
          'Create and save opportunity drafts.',
          'Enter complete opportunity information through a guided multi-step form.',
          'Upload a poster/supporting image with preview and validation.',
          'Preview exactly how the listing will appear before submission.',
          'Submit the opportunity for Campus Ambassador review.',
          'Track review status and lifecycle timeline.',
          'Receive correction requests or rejection reasons.',
          'Edit and resubmit corrected opportunities.',
          'See when an approved opportunity becomes published.',
        ],
      },
      {
        id: 'ambassador',
        label: 'Campus Ambassador',
        headerLine:
          'The Campus Ambassador is the trust layer between campus societies and the SkillLinkr student audience. Their portal focuses on efficient review, authenticity, and accountability within their assigned college.',
        checklist: [
          'View pending submissions from own college only.',
          'Open a full opportunity preview before taking action.',
          'Review the society, organizer, links, dates, eligibility, poster, venue, and opportunity details.',
          'Approve valid opportunities.',
          'Reject invalid or inappropriate submissions with a reason.',
          'Request field-specific corrections instead of forcing a full rejection.',
          'View status history and previous versions where available.',
          'Manage societies associated with the Ambassador’s own college, subject to Admin-created permissions.',
        ],
      },
      {
        id: 'admin',
        label: 'Admin',
        headerLine:
          'Admin acts as the platform-level operator. The Admin role is not intended to manually approve every normal opportunity; instead, it establishes the network and supervises its quality.',
        checklist: [
          'Add and manage Campus Ambassadors.',
          'Add and manage Society accounts.',
          'Manage colleges and their institutional configuration.',
          'View opportunities across all colleges and statuses.',
          'Access analytics, audit history, categories, configuration, and platform-level controls.',
          'Intervene globally when moderation, compliance, correction, or account management requires it.',
        ],
        note: 'Admin is not in the normal approval path. A same-college Ambassador approval is enough to publish.',
      },
    ],
  },

  capabilities: {
    eyebrow: '',
    title: 'What the system actually enforces.',
    body: 'Ten capabilities that make campus opportunity publishing accountable.',
    items: [
      {
        icon: 'SquareUser',
        title: 'Role-Based Access',
        description: 'Three controlled portals with different responsibilities.',
      },
      {
        icon: 'Building',
        title: 'College Isolation',
        description: 'Ambassadors manage only the colleges assigned to them.',
      },
      {
        icon: 'FilePlus2',
        title: 'Society Submission',
        description: 'Guided opportunity creation with complete event/opportunity details.',
      },
      {
        icon: 'GitPullRequestArrow',
        title: 'Review Workflow',
        description: 'Approve, reject, or request corrections before publication.',
      },
      {
        icon: 'Zap',
        title: 'Automatic Publish',
        description: 'Valid same-college Ambassador approval can publish directly.',
      },
      {
        icon: 'Activity',
        title: 'Status Tracking',
        description: 'Societies can follow the full lifecycle of their submissions.',
      },
      {
        icon: 'Bell',
        title: 'Notifications',
        description:
          'Important submission, correction, approval, rejection, and publication events can be surfaced.',
      },
      {
        icon: 'ScrollText',
        title: 'Auditability',
        description: 'Critical actions and status changes can be preserved for accountability.',
      },
      {
        icon: 'Radio',
        title: 'Public Opportunity Feed',
        description:
          'Only published/live opportunity data should reach the student-facing SkillLinkr experience.',
      },
      {
        icon: 'Network',
        title: 'Scalable College Network',
        description:
          'Designed to expand across many colleges without centralizing every review with Admin.',
      },
    ],
  },

  impact: {
    title: 'Students get a cleaner, verified opportunity feed.',
    body: 'The result is a cleaner and more trustworthy opportunity ecosystem where approved campus opportunities can move from the organization that creates them to the students who need them — without relying on scattered messages, manual forwarding, or uncontrolled publishing.',
    stats: [
      {
        token: '{{COLLEGE_COUNT}}',
        targetNum: 24,
        label: 'COLLEGES ON THE NETWORK',
        isPlaceholderToken: true,
      },
      {
        token: '{{ROLE_COUNT}}',
        targetNum: 3,
        label: 'CONTROLLED PORTALS',
        isPlaceholderToken: true,
      },
      {
        token: '100%',
        targetNum: 100,
        suffix: '%',
        label: 'REVIEWED BEFORE PUBLISH',
        isPlaceholderToken: false,
      },
    ],
    quote: 'Every opportunity carries its college, its society, and a name who verified it.',
  },

  cta: {
    eyebrow: '',
    title: 'Bring your campus onto SkillLinkr.',
    body: 'Invite societies to list opportunities, Ambassadors to manage their campus, and authorized users to sign in.',
    columns: [
      {
        audience: 'SOCIETIES',
        label: 'List an opportunity',
        href: 'mailto:oms@skilllinkr.com?subject=List%20Opportunity%20Request',
        isStub: true,
      },
      {
        audience: 'CAMPUS AMBASSADORS',
        label: 'Apply to manage your campus',
        href: '#apply-stub',
        isStub: true,
      },
      {
        audience: 'AUTHORIZED USERS',
        label: 'Sign in to OMS',
        href: 'https://oms.skilllinkr.com',
        isExternal: true,
      },
    ],
    tagline: 'oms.skilllinkr.com — one platform to submit, verify, manage, and publish campus opportunities.',
  },

  footer: {
    brand: 'SkillLinkr',
    badge: 'OMS',
    positioning:
      'SkillLinkr OMS is the operational backbone for campus opportunities. It gives societies an easy publishing workflow, Campus Ambassadors a college-specific verification system, and Admins a scalable governance layer. The result is a cleaner and more trustworthy opportunity ecosystem where approved campus opportunities can move from the organization that creates them to the students who need them — without relying on scattered messages, manual forwarding, or uncontrolled publishing.',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'How it works', href: '#flow' },
          { label: 'Roles', href: '#roles' },
          { label: 'Governance', href: '#governance' },
          { label: 'Portals', href: '#portals' },
          { label: 'Capabilities', href: '#capabilities' },
        ],
      },
      {
        title: 'Portals',
        links: [
          { label: 'Sign in', href: 'https://oms.skilllinkr.com' },
          { label: 'List an opportunity', href: '#cta' },
          { label: 'Apply as Campus Ambassador', href: '#apply-stub' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '#privacy-stub' },
          { label: 'Terms', href: '#terms-stub' },
          { label: 'College policy', href: '#policy-stub' },
        ],
      },
    ],
    copyright: '© {{YEAR}} SkillLinkr. All rights reserved.',
    tagline: 'Made for verified campus communities.',
  },
};
