import { Archive, ArrowDown, FileCheck2, History } from 'lucide-react';
import { Node, Row, Arrow, Down, Caption } from '@/components/flow-primitives';

export function VaultSystemMap() {
  return <figure className="sf-figure" aria-labelledby="vault-map-title"><div className="sf-heading"><span>Architecture</span><h3 id="vault-map-title">Ordinary tools in. Verifiable custody out.</h3><p className="sf-hint">Select any stage to see what enters, what happens, and what comes next.</p></div><div className="sf-system-map">
    <div className="sf-stack">
      <Node tag="Folder mount" title="People & scripts" text="Copy files into a network folder with cp, tar, rsync, or a file manager. No client software." detail={{ enters: 'Files written through a write-once FUSE mount by named writers.', happens: 'A file is staged while it is written and ingested when it is closed. Writing to an existing name starts a new version.', next: 'The new version appears in the folder and over S3 within about a second.' }} />
      <Node tag="S3 endpoint" title="Applications & tools" text="AWS SDKs and CLI, rclone, s3cmd, and backup software write to a bucket. Each PUT is a new version." detail={{ enters: 'S3 requests signed with SigV4 or presigned URLs, through the Versity S3 gateway.', happens: 'Checksums, conditional writes, multipart uploads, tags, and Object Lock are handled; every write becomes one ingest.', next: 'The object is readable over S3 and in the folder, with its provenance returned on every read.' }} />
      <Node tag="Custody decisions" title="Scanners & reviewers" text="A scanner or reviewer records its verdict on the exact bytes it checked—one command per decision." detail={{ enters: 'A verdict from a scanner, reviewer, or automated check, with actor and note.', happens: 'The state change is checked against the lifecycle policy and appended to the journal.', next: 'The verdict becomes part of the version’s history and of every passport issued for it.' }} />
    </div>
    <Arrow />
    <div className="sf-system-core"><Archive size={30} /><h4>Vault</h4><p>Append-only, content-addressed store</p><ul><li>Immutable, numbered versions</li><li>Content identifiers (CIDs) and SHA-256</li><li>One hash-chained journal</li><li>Lifecycle policy & retention</li><li>Passport export & verification</li></ul><div className="sf-core-witness"><ArrowDown size={20} /><strong>Outside witness</strong><span>Timed anchors: journal head and root CID</span></div></div>
    <Arrow />
    <div className="sf-stack">
      <Node tag="Portable evidence" title="Auditors & partners" text="A Data Passport proves one version’s arrival and history. Checked offline, without vault access." detail={{ enters: 'The journal records from a version’s ingest to the anchor that covers its latest decision.', happens: 'The records are exported as one JSON passport, anchored first when needed.', next: 'Anyone verifies it with the standalone verifier—offline for the chain, with the witness for the anchor.' }} />
      <Node tag="Release & routing" title="Destination storage" text="Verified files are delivered to a folder or S3 bucket, carrying their CID and SHA-256." detail={{ enters: 'A version marked verified, and a release target.', happens: 'The version is marked released, copied to the target with its fingerprints as metadata, and marked routed.', next: 'The destination can confirm exactly what it received; the routing event names the target.' }} />
      <Node tag="Retention" title="Purge under policy" text="Content leaves only by policy. Every record stays, and S3 holds stop the purge." detail={{ enters: 'A purge request selecting versions by state, age, and path.', happens: 'Eligible content is unpinned and its copy removed; held versions are skipped and reported.', next: 'A purged version keeps its full history and remains listed.' }} />
    </div>
  </div><Caption>Every arrow into the vault ends as a journal record. Nothing is overwritten, renamed, or deleted through any interface.</Caption></figure>;
}

export function VaultIngestPath() {
  return <figure className="sf-figure" aria-labelledby="vault-ingest-title"><div className="sf-heading"><span>Write path</span><h3 id="vault-ingest-title">One ingest, whichever door the file uses.</h3><p className="sf-hint">Select any stage to see what enters, what happens, and what comes next.</p></div><Row>
    <Node tag="01 / Receive" title="Folder close or S3 PUT" text="The bytes arrive through the mount, the S3 endpoint, or the command line." detail={{ enters: 'A file closed in the mount, an S3 PUT, copy, or completed multipart upload, or a CLI ingest.', happens: 'Checksums sent by an S3 client are checked before anything is stored; a mismatch stores nothing.', next: 'The bytes are streamed once into the content store.' }} />
    <Arrow />
    <Node tag="02 / Fingerprint" title="CID & SHA-256" text="One pass computes the SHA-256, stores the blocks, and keeps a plain copy." detail={{ enters: 'The incoming byte stream.', happens: 'A single pass feeds SHA-256, the object mirror, and the content store, which returns a reproducible CIDv1.', next: 'The version is ready to be recorded.' }} />
    <Arrow />
    <Node tag="03 / Journal" title="Hash-chained record" text="Under one writer lock, a record naming the previous record’s CID is appended." emphasis detail={{ enters: 'The version’s CID, size, SHA-256, owner, actor, and any S3 metadata.', happens: 'The record is canonically encoded, its CID computed locally and confirmed by the store, and HEAD advances. Conditional writes are decided here.', next: 'The index commits the new version in one transaction.' }} />
    <Arrow />
    <Node tag="04 / Present" title="Visible everywhere" text="The version appears in the folder, over S3, and in the history views." detail={{ enters: 'The committed record and index rows.', happens: 'The live tree is updated; the mount’s kernel cache is refreshed from the journal.', next: 'Readers see the new current version; every earlier version stays readable.' }} />
  </Row>
  <Down label="After commit: the same record serves every view" />
  <div className="sf-branches sf-three">
    <Node tag="Folder view" title="Files with provenance" text="Extended attributes carry CID, SHA-256, version, and state. .versions/ holds every version." detail={{ enters: 'The current and historical versions of each path.', happens: 'The mount presents current files read-only, every version under .versions/, and the journal itself under .vault/.', next: 'Any user or tool can read a file and its provenance with no vault software.' }} />
    <Node tag="S3 view" title="Versions & metadata" text="The version number is the S3 version ID; reads return the CID, SHA-256, and state." detail={{ enters: 'GET, HEAD, list, and attribute requests.', happens: 'Ranges and part numbers are served by byte span; provenance is returned as x-amz-meta-vault-* headers.', next: 'Applications learn what an object is and where it stands with one HEAD.' }} />
    <Node tag="Independent anchor" title="Outside witness" text="On a timer, the journal head and root CID are committed outside the host." emphasis detail={{ enters: 'The vault ID, journal position, head CID, and root CID—never file names.', happens: 'A log, ledger, or timestamping hook records the payload and returns a reference, kept as an anchor record.', next: 'History before the anchor cannot be rewritten without the witness disagreeing.' }} />
  </div>
  <Caption>The journal is written before the index, so an interrupted write is repaired by rebuilding the index from the journal.</Caption></figure>;
}

export function VaultLifecyclePath() {
  return <figure className="sf-figure" aria-labelledby="vault-lifecycle-title"><div className="sf-heading"><span>Custody lifecycle</span><h3 id="vault-lifecycle-title">Every decision joins the record.</h3><p className="sf-hint">Select any stage to see what enters, what happens, and what comes next.</p></div><Row>
    <Node tag="01 / Contained" title="Held on arrival" text="Every new version starts contained: stored, fingerprinted, readable, not yet trusted." detail={{ enters: 'A newly ingested version.', happens: 'The version is held unchanged and listed with state contained.', next: 'A scanner or reviewer takes it up.' }} />
    <Arrow />
    <Node tag="02 / Scanning" title="Checked in place" text="The scanner reads exactly the ingested bytes from the folder or over S3." detail={{ enters: 'A contained version.', happens: 'The scanner marks it scanning and inspects the stored bytes—never a separate copy.', next: 'The scanner records its verdict.' }} />
  </Row>
  <Down label="The verdict is recorded with its actor and note" />
  <div className="sf-decision">Clean?</div>
  <div className="sf-airlock-branches">
    <div><Down label="No" /><Node tag="Rejected" title="Held for investigation" text="The version stays readable to investigators with the scanner’s finding attached." detail={{ enters: 'A version the check failed.', happens: 'A rejected event records who decided and why.', next: 'Retention may purge its content later; the record and finding stay.' }} /><Down label="Retention policy" /><Node tag="Purged" title="Content dropped, record kept" text="Only routed or rejected versions are purged by default, and never while held." detail={{ enters: 'A rejected or routed version selected by a purge.', happens: 'Its content is unpinned and its copy removed unless another live version shares it; a purged event is appended.', next: 'The version remains listed, with its full history.' }} /></div>
    <div><Down label="Yes" /><Node tag="Verified" title="Cleared for release" text="The verdict is now part of the evidence for this exact version." emphasis detail={{ enters: 'A version the check passed.', happens: 'A verified event records the scanner, its finding, and the time.', next: 'The version can be released.' }} /><Down label="Release" /><Node tag="Released → routed" title="Delivered with fingerprints" text="Copied to a folder or S3 bucket with its CID and SHA-256; the target is recorded." detail={{ enters: 'A verified version and a target.', happens: 'The version is marked released, delivered, and marked routed with the target in the event.', next: 'A failed delivery stays released and is retried later.' }} /></div>
  </div>
  <div className="sf-ledger-thread"><History size={20} /><div><strong>Every state change → policy check → journal event → next anchor</strong><p>The transition table is set per vault and enforced on every change. A forced transition is allowed for operators and recorded as forced.</p></div></div>
  <Caption>The default policy also allows back-steps: scanning to contained, verified to scanning, released to verified, and rejected to scanning.</Caption></figure>;
}

export function VaultPassportPath() {
  return <figure className="sf-figure" aria-labelledby="vault-passport-title"><div className="sf-heading"><span>Passport issuance</span><h3 id="vault-passport-title">Select. Collect. Anchor. Export.</h3><p className="sf-hint">Select any stage to see what enters, what happens, and what comes next.</p></div><div className="sf-issuance">
    <div><Node tag="01 / Select" title="One version" text="Choose a path and version—current by default." detail={{ enters: 'A vault path and optional version number.', happens: 'The version’s ingest record and latest lifecycle event are located.', next: 'The records between them and the covering anchor are collected.' }} /><div className="sf-feed"><ArrowDown size={18} /><span>From the index</span></div></div>
    <Arrow />
    <div><Node tag="02 / Collect" title="Exact journal records" text="The contiguous records from ingest to the anchor covering its latest decision." emphasis detail={{ enters: 'The ingest record and the journal after it.', happens: 'The exact bytes of each record are copied, so every CID and link can be re-checked.', next: 'If no anchor covers the latest decision yet, one is made.' }} /><div className="sf-feed"><ArrowDown size={18} /><span>Byte-for-byte from the journal</span></div></div>
    <Arrow />
    <div><Node tag="03 / Anchor" title="Commit outside" text="Anchor first when needed, so the passport ends at a witnessed head." emphasis detail={{ enters: 'The current journal head and root CID.', happens: 'The witness receives the payload and returns a reference, stored as an anchor record.', next: 'The passport closes on that anchor.' }} /><div className="sf-feed"><ArrowDown size={18} /><span>Log, ledger, or timestamping hook</span></div></div>
    <Arrow />
    <div><Node tag="04 / Export" title="One JSON file" text="Records, subject, and summary in a single file that travels with the data." detail={{ enters: 'The collected records and anchor.', happens: 'A passport is written with a derived subject and history summary.', next: 'The holder can verify it anywhere with the standalone verifier.' }} /><div className="sf-feed"><ArrowDown size={18} /><span>Verifiable without the vault</span></div></div>
  </div>
  <div className="sf-proof-gate"><FileCheck2 size={20} /><p><strong>The witness is what makes it proof.</strong> Internal checks catch any edited, missing, or reordered record. A forger who rewrites history and recomputes every link produces a consistent chain—only the witness refuses it, because it never saw that head.</p></div>
  <Caption>A passport carries the records recorded between a file’s arrival and its anchor, including neighboring entries. Frequent anchors keep that window small; redactable passports are planned.</Caption></figure>;
}
