/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as React from 'react'
import { undo, redo, undoDepth, redoDepth } from 'prosemirror-history'

import { RedoIcon, UndoIcon } from '@tinacms/icons'

import { useEditorStateContext } from '../../../context/editorState'
import { MenuButton } from '../../../components/MenuHelpers'

export const MenuItem = () => (
  <>
    <UndoControl />
    <RedoControl />
  </>
)

const UndoControl = () => {
  const { editorView } = useEditorStateContext()
  const undoChange = () => {
    const { state, dispatch } = editorView!.view
    undo(state, dispatch)
  }

  return (
    <MenuButton
      data-tooltip="Undo"
      data-side="top"
      onClick={undoChange}
      disabled={undoDepth(editorView!.view.state) < 1}
    >
      <UndoIcon />
    </MenuButton>
  )
}

const RedoControl = () => {
  const { editorView } = useEditorStateContext()

  const redoChange = () => {
    const { state, dispatch } = editorView!.view
    redo(state, dispatch)
  }

  return (
    <MenuButton
      data-tooltip="Redo"
      data-side="top"
      onClick={redoChange}
      disabled={redoDepth(editorView!.view.state) < 1}
    >
      <RedoIcon />
    </MenuButton>
  )
}
