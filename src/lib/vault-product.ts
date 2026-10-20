export const copyLayers = [
  { title: 'Content store', question: 'Is every byte still there?', text: 'An offline IPFS node (kubo) holds every version’s blocks, the live tree, and the journal. One root CID commits to all content and all history.', outcome: 'Rebuilds the index on its own.' },
  { title: 'Index', question: 'Does the fast view match the journal?', text: 'A SQLite index serves listings, attributes, and S3 metadata. It is derived from the journal and can be recreated from it at any time.', outcome: 'Detects edits by re-checking every record against the chain.' },
  { title: 'Object mirror', question: 'Can content be recovered without the node?', text: 'A plain copy of every version, named by its CID. It serves reads and S3 ranges, and re-supplies content the node has lost.', outcome: 'With the index, rebuilds the content store to the identical root CID.' },
];

export const passportChecks = [
  { tier: 'C1', title: 'Chain integrity', needs: 'The passport file', proves: 'Every record hashes to its CID and links to the one before; the subject and history match the records.', mode: 'Offline' },
  { tier: 'C2', title: 'Content match', needs: 'Your copy of the file', proves: 'Size and SHA-256 match, and the content identifier is recomputed from the bytes.', mode: 'Offline · large files use any IPFS node, which stores nothing' },
  { tier: 'C3', title: 'Anchor', needs: 'Access to the outside witness', proves: 'The witness holds the anchored head the passport names, so the history was not rewritten after anchoring.', mode: 'Connected' },
  { tier: 'C4', title: 'Whole vault', needs: 'Operator access', proves: 'Every record, every live file, and optionally every stored byte against its recorded fingerprint.', mode: 'On the host' },
];

export const vaultBehaviors = [
  { title: 'A client tries to overwrite, rename, or delete', text: 'The folder answers “operation not permitted” and S3 answers AccessDenied. Writing to an existing name creates a new version; the earlier one stays readable.' },
  { title: 'Two writers race to create the same key', text: 'Conditional S3 writes (If-None-Match, If-Match) are checked under the vault’s single writer lock, together with the append. Exactly one succeeds; the other receives PreconditionFailed.' },
  { title: 'The index is lost or edited', text: 'Verification flags any record that no longer matches its CID or chain. The index is rebuilt by replaying the journal from the content store.' },
  { title: 'The content store is lost', text: 'Content is re-added from the object mirror, each file required to reproduce its recorded CID. Journal and live tree are rewritten, and the root CID matches the original.' },
  { title: 'The process stops between journal and index', text: 'The journal is written first. Verification reports that the journal is ahead of the index, and a rebuild brings the index level.' },
  { title: 'Retention would purge content under a hold', text: 'Purge skips any version under a legal hold or unexpired Object Lock retention and reports it as held. Its content stays until the hold is lifted—itself a journal record.' },
];

export const vaultLandscape = [
  { category: 'Write-once file storage', examples: 'NetApp SnapLock, Dell PowerScale SmartLock', strength: 'Immutable files over standard file shares; mature and widely used for records retention.', fit: 'Adds a custody history and proof an outsider can check. Their immutability rests on the array and its administrators.', line: 'Locked is not the same as provable.' },
  { category: 'Object Lock on buckets', examples: 'Amazon S3, MinIO, Ceph', strength: 'Retention periods and legal holds through the S3 API.', fit: 'The vault speaks the same API, with Object Lock bound to a hash-chained journal—and a hold also stops the vault’s own purge.', line: 'Same S3 calls. A record behind them.' },
  { category: 'Quarantine & transfer vaults', examples: 'OPSWAT MetaDefender Vault', strength: 'Multi-engine scanning, timed quarantine, approval workflows, and audit logs.', fit: 'The scan verdict and the release join the same tamper-evident chain as the file’s arrival, and the file can leave with its proof.', line: 'They hold the file. The vault proves what happened to it.' },
  { category: 'Verifiable ledger databases', examples: 'immudb, Azure SQL ledger; Amazon QLDB (retired July 2025)', strength: 'Cryptographic proof that records were not altered.', fit: 'The vault stores the files themselves, through a folder and S3, and anchors its history to a witness outside the host.', line: 'Proof for the bytes, not just the rows.' },
  { category: 'Transparency logs & timestamping', examples: 'Certificate Transparency, Sigstore Rekor, OpenTimestamps', strength: 'Public, independently checkable logs of hashes and signatures.', fit: 'The vault keeps the content and its custody process, and can use a timestamping service or ledger as its witness.', line: 'A witness the vault can use, not a store.' },
];
