export const eventFlow = [
  { title: 'Publish & queue', text: 'Applications publish audit events. A durable queue buffers delivery; local spooling covers queue outages.' },
  { title: 'Sign & validate', text: 'An enrolled writer signs the event. Both organizations check its schema, identity, and permitted scope.' },
  { title: 'Endorse & commit', text: 'Both organizations endorse. Ordered transactions are validated and committed to each ledger copy.' },
  { title: 'Witness & project', text: 'Committed events feed an independent witness and local query models. Delivery is acknowledged on commit.' },
];

export const intakeFlow = [
  { title: 'Receive & hash', text: 'Airlock receives the object and creates a SHA-256 content fingerprint to link its custody history.' },
  { title: 'Scan & classify', text: 'Checks identify malware and sensitive data, including personal, health, financial, and secret information.' },
  { title: 'Quarantine or contain', text: 'Detected malware is quarantined. Other objects enter the containment vault, linked by content identity.' },
  { title: 'Release & route', text: 'Policy-driven release and routing to destination storage are planned for Airlock phase 2.', planned: true },
];

export const verificationLayers = [
  { title: 'Dual ledgers', question: 'Do both custodians agree?', text: 'Live checks compare the same record on DataOrg and AuditOrg peers. Missing records or different digests are surfaced.', outcome: 'Detects disagreement between ledger copies.' },
  { title: 'Independent witness', question: 'Is the history anchored?', text: 'The QMDB witness records checkpoints outside the ledger hosts. Organization cosigners rebuild from their own peers before signing.', outcome: 'Provides independent inclusion and checkpoint evidence.' },
  { title: 'Verified read model', question: 'Does the query match the ledger?', text: 'SQL copies make queries fast. On-demand checks compare rows against the ledger; passport proofs are retrieved live, not from SQL.', outcome: 'Detects changes to the application’s query copy.' },
];

export const evidenceTiers = [
  { tier: 'T1', title: 'Passport integrity', needs: 'The Data Passport + an issuer key the reviewer pins', proves: 'The signed bundle is authentic and unchanged since issuance.', mode: 'Offline' },
  { tier: 'T2', title: 'Data match', needs: 'Your copy of the data object', proves: 'The object’s bytes match the content hash in the passport.', mode: 'Offline' },
  { tier: 'T3', title: 'On-chain re-check', needs: 'Read access to the ledger', proves: 'The transactions exist on the ledger and carry both organizations’ endorsement.', mode: 'Connected' },
  { tier: 'T4', title: 'Witness proof', needs: 'Witness keys the reviewer pins', proves: 'Each transaction is included in the independent witness log under a co-signed checkpoint.', mode: 'Connected' },
  { tier: 'T5', title: 'OSCAL re-projection', needs: 'The OSCAL export + its Data Passport', proves: 'The export matches what the passport projects; any changed field is identified.', mode: 'Export verification' },
];

export const accountabilityPillars = [
  { label: '01 / Identity', title: 'Every action has an accountable identity', text: 'People, services, and AI agents write only under an approved, key-bound identity, inside the scope their groups allow. A certificate with a different key is refused until the change is approved.', proof: 'In the demo: an agent’s first write is refused. AuditOrg approves it, and the same agent succeeds. An out-of-scope write is refused.' },
  { label: '02 / Separation of duties', title: 'No one approves their own work', text: 'The operator cannot activate its own writers, attest its own assessments, or lift a containment the other organization imposed. The ledger enforces it—not a workflow tool.', proof: 'In the demo: DataOrg tries to activate its own writer and is refused. AuditOrg revokes an agent; DataOrg cannot reinstate it.' },
  { label: '03 / Evidence', title: 'Evidence that checks out without us', text: 'A Data Passport verifies offline against keys the reviewer pins. Deeper checks re-read the ledger and the independent witness.', proof: 'In the demo: change one byte in a passport and verification fails. Stop the witness and the issuer refuses to issue.' },
];

export const landscape = [
  { category: 'Runtime AI control', examples: 'ServiceNow AI Control Tower, AI Passport', strength: 'Discovery, governance, and runtime control of agents: what each agent may do, with a kill switch.', fit: 'After the fact: two-party evidence of what agents did and which approvals were given.', line: 'They decide what an agent may do. Soteria proves what it did.' },
  { category: 'AI governance suites', examples: 'IBM watsonx.governance, Credo AI', strength: 'AI inventory, risk, policy, regulatory mapping, and monitoring across the model lifecycle.', fit: 'A verification layer under their records—not a replacement for the suite.', line: 'A policy says what should happen. Soteria proves what did.' },
  { category: 'Data protection', examples: 'Microsoft Purview', strength: 'Discovery, classification, protection, and compliance for data and supported AI apps.', fit: 'Evidence of custody and decisions across organizations, alongside data protection.', line: 'Purview protects the data. Soteria proves what happened to it.' },
  { category: 'GRC and privacy', examples: 'OneTrust', strength: 'GRC, privacy, and AI risk workflows.', fit: 'Feeds verifiable evidence into the workflow you already run.', line: 'Keep your GRC process. Make its evidence verifiable.' },
  { category: 'Compliance automation', examples: 'Vanta, Drata, Paramify', strength: 'Evidence collection through integrations; FedRAMP 20x and OSCAL packaging.', fit: 'Their evidence is gathered and attested by the provider. Soteria’s is endorsed by a second party and verifiable by the assessor—and OSCAL lets us feed them.', line: 'They collect your evidence. Soteria makes it checkable.' },
  { category: 'Tamper-evident databases', examples: 'immudb, Azure SQL ledger', strength: 'Proof that one operator’s database was not altered.', fit: 'Soteria requires two organizations and an independent witness to agree.', line: 'Tamper-evident to whom? One operator can’t vouch for itself.' },
];

export const markets = [
  { name: 'FedRAMP cloud providers & 3PAOs', text: 'Soteria exports the FedRAMP Security Decision Record, OSCAL documents, and 20x Key Security Indicator history—evidence for the package, which the assessor can re-derive.', party: 'Second party: the 3PAO, or the provider’s independent security team.' },
  { name: 'Financial services', text: 'A complete, time-stamped trail of every change and who made it, endorsed by a second party. Regulators increasingly ask firms to track and supervise what AI agents do.', party: 'Second party: the compliance function, or a designated third party.' },
  { name: 'Defense contractors', text: 'The NIST SP 800-171 r2 mapping behind CMMC Level 2 is built, so self-assessments can rest on dual-endorsed records. The C3PAO makes the determination.', party: 'Second party: a C3PAO, or the contractor’s independent security team.' },
  { name: 'Life sciences', text: 'Sponsor and CRO are two parties by nature. Time-stamped, attributable trails for regulated records and the AI used in trials and manufacturing.', party: 'Second party: the sponsor’s quality assurance, or the CRO.' },
  { name: 'Healthcare delivery', text: 'Attributable trails for systems and AI agents that touch patient data. Content stays in its storage; only hashes and opaque identifiers belong on the ledger, so no patient information is recorded there.', party: 'Second party: the compliance or privacy office, or a business associate.' },
  { name: 'Media & entertainment', text: 'Provenance and chain of custody: who registered an asset, when, and that it is unchanged since—a record that survives when file metadata is stripped.', party: 'Second party: a distributor, guild, rights society, or registry.' },
];

export const failureBehaviors = [
  { title: 'Queue or transient delivery failure', text: 'Events spool locally when the queue is unavailable. Transient submissions retry with backoff; acknowledgement follows ledger commit, not initial receipt.' },
  { title: 'Invalid or unauthorized event', text: 'Ledger rules reject the event. Invalid events move to a dead-letter queue rather than becoming committed evidence.' },
  { title: 'Witness unavailable or parties disagree', text: 'A witness outage does not stop ledger writes, but anchored passports are withheld. Disagreement halts the witness or stops a cosigner until an operator resolves it.' },
  { title: 'Query copy altered or lost', text: 'Integrity checks flag divergence from the ledger. The affected row can be re-projected, or the query model rebuilt from committed blocks.' },
];