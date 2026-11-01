import React, { useRef, useState } from 'react';
import Icon from '../ui/Icon';
import { prettyField } from '../../utils/status';
import './DocDropzone.css';

const fmtSize = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/**
 * One drag-and-drop slot for a required document.
 * status: 'empty' | 'ready' | 'reading' | 'done' | 'failed'
 */
export default function DocDropzone({ docType, index, entry, locked, progress, onFile, onRemove }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const { file, preview, status } = entry;

  const pick = (f) => { if (f && f.type.startsWith('image/')) onFile(docType, f); };
  const open = () => !locked && inputRef.current?.click();

  return (
    <div className={`dz card dz-${status} ${locked ? 'dz-locked' : ''}`}>
      <div className="dz-head">
        <span className="dz-index">{index + 1}</span>
        <span className="dz-name">{prettyField(docType)}</span>
        <span className="dz-req">Required</span>
        {status === 'done' && <span className="badge badge-matched"><Icon name="check" size={13} strokeWidth={3} />Read</span>}
        {status === 'failed' && <span className="badge badge-mismatch"><Icon name="alert" size={13} />Couldn&rsquo;t read</span>}
      </div>

      {!file ? (
        <div
          className={`dz-zone ${drag ? 'dz-over' : ''}`}
          role="button" tabIndex={locked ? -1 : 0}
          aria-disabled={locked}
          aria-label={`Add ${prettyField(docType)}`}
          onClick={open}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
          onDragOver={(e) => { e.preventDefault(); if (!locked) setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); if (!locked) pick(e.dataTransfer.files[0]); }}
        >
          <Icon name="upload" size={22} />
          <span><b>{locked ? 'Give consent to add documents' : 'Drop an image here'}</b>{!locked && <> or <u>browse</u></>}</span>
          <small>JPG or PNG · a clear, well-lit photo works best</small>
        </div>
      ) : (
        <div className="dz-file">
          <div className="dz-thumb">{preview ? <img src={preview} alt="" /> : <Icon name="image" size={22} />}</div>
          <div className="dz-meta">
            <div className="dz-filename" title={file.name}>{file.name}</div>
            <div className="dz-size">{fmtSize(file.size)}</div>
            {status === 'reading' && (
              <div className="dz-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div style={{ width: `${Math.max(6, progress)}%` }} />
                <span>Reading text on your device… {progress}%</span>
              </div>
            )}
          </div>
          {status !== 'reading' && (
            <button className="btn btn-ghost btn-sm" onClick={() => onRemove(docType)} aria-label={`Remove ${prettyField(docType)}`}>
              <Icon name="trash" size={16} /> Remove
            </button>
          )}
        </div>
      )}

      <input
        ref={inputRef} type="file" accept="image/*" hidden
        onChange={(e) => { pick(e.target.files[0]); e.target.value = ''; }}
      />
    </div>
  );
}
