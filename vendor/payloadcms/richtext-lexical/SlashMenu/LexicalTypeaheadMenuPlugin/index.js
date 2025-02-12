'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { mergeRegister } from '@lexical/utils';
import { $getSelection, $isRangeSelection, $isTextNode, COMMAND_PRIORITY_LOW, createCommand, getDOMSelection } from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { LexicalMenu, useMenuAnchorRef } from './LexicalMenu.js';
export const PUNCTUATION = '\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%\'"~=<>_:;';
function getTextUpToAnchor(selection) {
  const anchor = selection.anchor;
  if (anchor.type !== 'text') {
    return null;
  }
  const anchorNode = anchor.getNode();
  if (!anchorNode.isSimpleText()) {
    return null;
  }
  const anchorOffset = anchor.offset;
  return anchorNode.getTextContent().slice(0, anchorOffset);
}
function tryToPositionRange(leadOffset, range, editorWindow) {
  const domSelection = getDOMSelection(editorWindow);
  if (domSelection === null || !domSelection.isCollapsed) {
    return false;
  }
  const anchorNode = domSelection.anchorNode;
  const startOffset = leadOffset;
  const endOffset = domSelection.anchorOffset;
  if (anchorNode == null || endOffset == null) {
    return false;
  }
  try {
    range.setStart(anchorNode, startOffset);
    // if endOffset is 0, positioning the range for when you click the plus button to open the slash menu will fial
    range.setEnd(anchorNode, endOffset > 1 ? endOffset : 1);
  } catch (error) {
    return false;
  }
  return true;
}
function getQueryTextForSearch(editor) {
  let text;
  editor.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return;
    }
    text = getTextUpToAnchor(selection);
  });
  return text;
}
function isSelectionOnEntityBoundary(editor, offset) {
  if (offset !== 0) {
    return false;
  }
  return editor.getEditorState().read(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchor = selection.anchor;
      const anchorNode = anchor.getNode();
      const prevSibling = anchorNode.getPreviousSibling();
      return $isTextNode(prevSibling) && prevSibling.isTextEntity();
    }
    return false;
  });
}
function startTransition(callback) {
  if (React.startTransition) {
    React.startTransition(callback);
  } else {
    callback();
  }
}
export { useDynamicPositioning } from './LexicalMenu.js';
export const ENABLE_SLASH_MENU_COMMAND = createCommand('ENABLE_SLASH_MENU_COMMAND');
export function LexicalTypeaheadMenuPlugin(t0) {
  const $ = _c(30);
  const {
    anchorClassName,
    anchorElem,
    groups,
    menuRenderFn,
    onClose,
    onOpen,
    onQueryChange,
    triggerFn
  } = t0;
  const [editor] = useLexicalComposerContext();
  const [resolution, setResolution] = useState(null);
  const anchorElementRef = useMenuAnchorRef(anchorElem, resolution, setResolution, anchorClassName);
  let t1;
  if ($[0] !== onClose || $[1] !== resolution) {
    t1 = () => {
      setResolution(null);
      if (onClose != null && resolution !== null) {
        onClose();
      }
    };
    $[0] = onClose;
    $[1] = resolution;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  const closeTypeahead = t1;
  let t2;
  if ($[3] !== onOpen || $[4] !== resolution) {
    t2 = res => {
      setResolution(res);
      if (onOpen != null && resolution === null) {
        onOpen(res);
      }
    };
    $[3] = onOpen;
    $[4] = resolution;
    $[5] = t2;
  } else {
    t2 = $[5];
  }
  const openTypeahead = t2;
  let t3;
  let t4;
  if ($[6] !== editor || $[7] !== openTypeahead) {
    t3 = () => mergeRegister(editor.registerCommand(ENABLE_SLASH_MENU_COMMAND, t5 => {
      const {
        node
      } = t5;
      editor.getEditorState().read(() => {
        const match = {
          leadOffset: 0,
          matchingString: "",
          replaceableString: ""
        };
        if (!isSelectionOnEntityBoundary(editor, match.leadOffset)) {
          if (node !== null) {
            const editorWindow = editor._window ?? window;
            const range = editorWindow.document.createRange();
            const isRangePositioned = tryToPositionRange(match.leadOffset, range, editorWindow);
            if (isRangePositioned !== null) {
              startTransition(() => openTypeahead({
                getRect: () => range.getBoundingClientRect(),
                match
              }));
            }
            return;
          }
        }
      });
      return true;
    }, COMMAND_PRIORITY_LOW));
    t4 = [editor, openTypeahead];
    $[6] = editor;
    $[7] = openTypeahead;
    $[8] = t3;
    $[9] = t4;
  } else {
    t3 = $[8];
    t4 = $[9];
  }
  useEffect(t3, t4);
  let t5;
  if ($[10] !== closeTypeahead || $[11] !== editor || $[12] !== onQueryChange || $[13] !== openTypeahead || $[14] !== triggerFn) {
    t5 = () => {
      const updateListener = () => {
        editor.getEditorState().read(() => {
          const editorWindow_0 = editor._window ?? window;
          const range_0 = editorWindow_0.document.createRange();
          const selection = $getSelection();
          const text = getQueryTextForSearch(editor);
          if (!$isRangeSelection(selection) || !selection.isCollapsed() || text === undefined || range_0 === null) {
            closeTypeahead();
            return;
          }
          const match_0 = triggerFn({
            editor,
            query: text
          });
          onQueryChange(match_0 ? match_0.matchingString : null);
          if (match_0 !== null && !isSelectionOnEntityBoundary(editor, match_0.leadOffset)) {
            const isRangePositioned_0 = tryToPositionRange(match_0.leadOffset, range_0, editorWindow_0);
            if (isRangePositioned_0 !== null) {
              startTransition(() => openTypeahead({
                getRect: () => range_0.getBoundingClientRect(),
                match: match_0
              }));
              return;
            }
          }
          closeTypeahead();
        });
      };
      const removeUpdateListener = editor.registerUpdateListener(updateListener);
      return () => {
        removeUpdateListener();
      };
    };
    $[10] = closeTypeahead;
    $[11] = editor;
    $[12] = onQueryChange;
    $[13] = openTypeahead;
    $[14] = triggerFn;
    $[15] = t5;
  } else {
    t5 = $[15];
  }
  let t6;
  if ($[16] !== closeTypeahead || $[17] !== editor || $[18] !== onQueryChange || $[19] !== openTypeahead || $[20] !== resolution || $[21] !== triggerFn) {
    t6 = [editor, triggerFn, onQueryChange, resolution, closeTypeahead, openTypeahead];
    $[16] = closeTypeahead;
    $[17] = editor;
    $[18] = onQueryChange;
    $[19] = openTypeahead;
    $[20] = resolution;
    $[21] = triggerFn;
    $[22] = t6;
  } else {
    t6 = $[22];
  }
  useEffect(t5, t6);
  let t7;
  if ($[23] !== anchorElementRef || $[24] !== closeTypeahead || $[25] !== editor || $[26] !== groups || $[27] !== menuRenderFn || $[28] !== resolution) {
    t7 = anchorElementRef.current === null || resolution === null || editor === null ? null : _jsx(LexicalMenu, {
      anchorElementRef,
      close: closeTypeahead,
      editor,
      groups,
      menuRenderFn,
      resolution,
      shouldSplitNodeWithQuery: true
    });
    $[23] = anchorElementRef;
    $[24] = closeTypeahead;
    $[25] = editor;
    $[26] = groups;
    $[27] = menuRenderFn;
    $[28] = resolution;
    $[29] = t7;
  } else {
    t7 = $[29];
  }
  return t7;
}
//# sourceMappingURL=index.js.map