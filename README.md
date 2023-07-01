# ngx-flexlayout

This library is built to provide a solution for Angular enables the creation of complex layouts consisting of panels that can be floated, docked, nested, resized, pinned, unpinned and closed. Additional components can be integrated to create an IDE-like layout.\
Demo on the [Stackblitz](https://stackblitz.com/edit/angular-ngx-flexlayout?file=src/app/app.component.ts) or [Codesandbox](https://codesandbox.io/s/ngx-flexlayout-tl7br?file=/src/app/app.component.ts)

![Logo](https://raw.githubusercontent.com/id1945/ngx-flexlayout/master/ngx-flexlayout.gif)

## Installation
Install `ngx-flexlayout` from `npm`:
```bash
npm install ngx-flexlayout --save
```

Add wanted package to NgModule imports:
```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { defineCustomElements } from 'ngx-flexlayout/loader';
defineCustomElements();

@NgModule({
  imports: [
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```
Component
```typescript
public layout  = {
    rootPane: {
        type: 'splitPane',
        orientation: 'horizontal',
        panes: [
            {
                type: 'contentPane',
                contentId: 'content1',
                header: 'Pane 1'
            }
        ]
    }
};
```
Html 
```html
<ngx-flexlayout [layout]="layout">
  <div slot="content1" class="dockManagerContent">Content 1</div>
  ...
</ngx-flexlayout>
```
## API Documentation


<details><summary><b>Content pane :hammer_and_wrench: </b></summary>
  
[&#128279;](https://www.infragistics.com/products/ignite-ui/dock-manager/docs/typescript/latest/interfaces/igccontentpane.html)
The main building blocks in the Dock Manager are the panes. `IgcContentPane`
Property                |Type                       |Default    |Description
------------------------|---------------------------|-----------|-----------------------------------------------------
id                      |string                     |           |The id of the pane. If not set the Dock Manager generates it automatically.
type                    |string ('splitPane', 'contentPane', 'tabGroupPane', 'documentHost') |'contentPane' |The type of the pane.
contentId               |string                     |           |The slot attribute's value of the content element.
header                  |string                     |           |The text header of the content pane. Even if header slot templates are used, the text header is used for aria label.
headerId                |string                     |           |The slot attribute's value of the content pane header element. If not set, the `header` property value is used.
tabHeaderId             |string                     |           |The slot attribute's value of the tab header element. If not set, the `header` property value is used.
unpinnedHeaderId        |string                     |           |The slot attribute's value of the unpinned header element. If not set, the `header` property value is used.
size                    |number                     |    100    |The size of the pane relative to its sibling panes' sizes.

#
```typescript
const contentPane: IgcContentPane = {
    type: 'contentPane',
    contentId: 'content1',
    header: 'Pane 1',
    isPinned: false
    tabHeaderId: 'tabHeader1'
}
```
```typescript
public layout  = {
    rootPane: contentPane
};
```
```html
<ngx-flexlayout [layout]="layout">
    <div slot="content1" class="dockManagerContent">Content 1</div>
    <span slot="tabHeader1">Pane 1 Tab</span>
</ngx-flexlayout>
```
  
</details>


<details><summary><b>Split pane :hammer_and_wrench: </b></summary>
  
[&#128279;](https://www.infragistics.com/products/ignite-ui/dock-manager/docs/typescript/latest/interfaces/igcsplitpane.html)
The content pane represents a pane with header and content. It can be hosted inside a Split Pane or a Tab Group Pane. `IgcSplitPane`
Property                |Type                       |Default    |Description
------------------------|---------------------------|-----------|-----------------------------------------------------
id                      |string                     |           |The id of the pane. If not set the Dock Manager generates it automatically.
type                    |string ('splitPane', 'contentPane', 'tabGroupPane', 'documentHost') | 'splitPane' |The type of the pane.
orientation             |string ('horizontal', 'vertical') |            |The orientation of the split pane.
panes                   |IgcDockManagerPane[]       |         |The child panes of the split pane.
size                    |number                     |   100     |The size of the pane relative to its sibling panes' sizes.
floatingLocation        |IgcDockManagerPoint        |           |The absolute location point of the pane. Applies only for floating panes.
floatingWidth           |number                     |   100     |The absolute width of the pane. Applies only for floating panes.
floatingHeight          |number                     |   100     |The absolute height of the pane. Applies only for floating panes.
floatingResizable       |boolean                    |           |Determines whether floating pane resizing is allowed. Applies only for floating panes.

#
```typescript
const splitPane: IgcSplitPane = {
    type: 'splitPane',
    orientation: 'horizontal',
    panes: [
        {
            type: 'contentPane',
            contentId: 'content1',
            header: 'Pane 1'
        },
        {
            type: 'contentPane',
            contentId: 'content2',
            header: 'Pane 2'
        }
    ]
}
```
```typescript
public layout  = {
    rootPane: splitPane
};
```
  
</details>


<details><summary><b>Tab group pane  :hammer_and_wrench: </b></summary>

[&#128279;](https://www.infragistics.com/products/ignite-ui/dock-manager/docs/typescript/latest/interfaces/igctabgrouppane.html)
The split pane is a container pane which stacks all of its child panes horizontally or vertically based on its orientation property. `IgcTabGroupPane`
Property                |Type                       |Default    |Description
------------------------|---------------------------|-----------|-----------------------------------------------------
id                      |string                     |           |The id of the pane. If not set the Dock Manager generates it automatically.
type                    |string ('splitPane', 'contentPane', 'tabGroupPane', 'documentHost') |'tabGroupPane' |The type of the pane.
panes                   |IgcContentPane[]           |           |The child content panes of the tab group.
size                    |number                     |   100     |The size of the pane relative to its sibling panes' sizes.
selectedIndex           |number                     |           |The index of the selected tab.

#
```typescript
const tabGroupPane: IgcTabGroupPane = {
    type: 'tabGroupPane',
    panes: [
        {
            type: 'contentPane',
            contentId: 'content1',
            header: 'Pane 1'
        },
        {
            type: 'contentPane',
            contentId: 'content2',
            header: 'Pane 2'
        }
    ]
}
```
```typescript
public layout  = {
    rootPane: tabGroupPane
};
```

</details>


<details><summary><b>Document host  :hammer_and_wrench: </b></summary>

[&#128279;](https://www.infragistics.com/products/ignite-ui/dock-manager/docs/typescript/latest/interfaces/igcdocumenthost.html)
The floating pane is a split pane rendered above all other ones in a floating window.`IgcDocumentHost`
Property                |Type                       |Default    |Description
------------------------|---------------------------|-----------|-----------------------------------------------------
id                      |string                     |           |The id of the pane. If not set the Dock Manager generates it automatically.
type                    |string ('splitPane', 'contentPane', 'tabGroupPane', 'documentHost') |'documentHost' |The type of the pane.
rootPane                |IgcSplitPane               |           |The root split pane of the document host.
size                    |number                     |   100     |The size of the pane relative to its sibling panes' sizes.

#
```typescript
const docHost: IgcDocumentHost = {
    type: 'documentHost',
    rootPane: {
        type: 'splitPane',
        orientation: 'horizontal',
        panes: [
            {
                type: 'tabGroupPane',
                panes: [
                    {
                        type: 'contentPane',
                        contentId: 'content1',
                        header: 'Grid'
                    },
                    {
                        type: 'contentPane',
                        contentId: 'content4',
                        header: 'List'
                    }
                ]
            }
        ]
    }
}
```

</details>


<details><summary><b>Floating pane   :hammer_and_wrench: </b></summary>
  
  
[&#128279;](https://www.infragistics.com/products/ignite-ui/dock-manager/docs/typescript/latest/interfaces/igcdockmanagerlayout.html)
The tab group pane displays its child content panes as the tabs of a tab component. `IgcSplitPane`

```typescript
const layout: IgcDockManagerLayout = {
    rootPane: {
        // ...
    },
    floatingPanes: [
        {
            type: 'splitPane',
            orientation: 'horizontal',
            floatingLocation: { x: 80, y: 80 },
            floatingWidth: 200,
            floatingHeight: 150,
            floatingResizable: true,
            panes: [
                {
                    type: 'contentPane',
                    contentId: 'content1',
                    header: 'Floating Pane 1'
                }
            ]
        }
    ]
};
```

</details>


<details><summary><b>Themes :hammer_and_wrench: </b></summary>
  
 
```css
@import '~ngx-flexlayout/dist/collection/styles/themes.css';
```
```html
<ngx-flexlayout class="light-theme | dark-theme">
```

</details>


<details><summary><b>Localization :hammer_and_wrench: </b></summary>
  

```typescript
import { addResourceStrings } from 'ngx-flexlayout';

const dockManagerStringsFr: IgcDockManagerResourceStrings = {
  close: 'Fermer',
  // ...
};

addResourceStrings('fr', dockManagerStringsFr);
```
  
</details>


<details><summary><b>Input :hammer_and_wrench: </b></summary>

Input                   |Type                       |Default    |Description
------------------------|---------------------------|-----------|-----------------------------------------------------
layout                  |IgcDockManagerLayout         |           |Gets/sets the layout configuration of the Dock Manager.
draggedPane             |IgcContentPane, IgcSplitPane, IgcTabGroupPane|           |Gets/sets the currently dragged pane.
dropPosition            |IgcDockManagerPoint|          |Gets/sets the current drop position when performing custom drag/drop.
activePane              |IgcContentPane    |           |Gets/sets the active pane of the Dock Manager.
allowMaximize           |boolean                    |   true    |Determines whether the end user is allowed to maximize panes.
maximizedPane           |IgcContentPane, IgcSplitPane, IgcTabGroupPane|           |Gets/sets the maximized pane.
resourceStrings         |IgcDockManagerResourceStrings|             |Gets/sets the resource strings.
allowFloatingPanesResize    |boolean                |   true     |Determines whether the end user is allowed to resize floating panes.

</details>


<details><summary><b>Output :hammer_and_wrench: </b></summary>

Input                   |Type                       |Description
------------------------|---------------------------|-----------------------------------------------------
splitterResizeStart     |CustomEvent                |An event raised when a splitter resizing starts.
splitterResizeEnd       |CustomEvent                |An event raised when a splitter resizing ends.
paneHeaderConnected     |CustomEvent - IgcPaneHeaderConnectionEventArgs|An event raised when a pane header element is connected.
paneHeaderDisconnected  |CustomEvent - IgcPaneHeaderConnectionEventArgs|An event raised when a pane header element is disconnected.
tabHeaderConnected      |CustomEvent - IgcTabHeaderConnectionEventArgs |An event raised when a tab header element is connected.
tabHeaderDisconnected   |CustomEvent - IgcTabHeaderConnectionEventArgs |An event raised when a tab header element is disconnected.
paneClose               |CustomEvent - IgcPaneCloseEventArgs           |An event raised when panes are about to close.
panePinnedToggle        |CustomEvent - IgcPanePinnedEventArgs          |An event raised when panes are about to get pinned/unpinned.
paneDragStart           |CustomEvent - IgcPaneDragStartEventArgs       |An event raised when a pane drag starts.
paneDragOver            |CustomEvent - IgcPaneDragOverEventArgs        |An event raised when a pane is dragged over.
paneDragEnd             |CustomEvent - IgcPaneDragEndEventArgs         |An event raised when a pane drag ends.
activePaneChanged       |CustomEvent - IgcActivePaneEventArgs          |An event raised when a pane is selected/activated
floatingPaneResizeEnd   |CustomEvent - IgcFloatingPaneResizeEventArgs  |An event raised when a floating pane resize operation ends.
floatingPaneResizeStart |CustomEvent - IgcFloatingPaneResizeEventArgs      |An event raised when a floating pane resizing operation starts.
floatingPaneResizeMove  |CustomEvent - IgcFloatingPaneResizeMoveEventArgs  |An event raised when a floating pane resizing operation is in progress.

</details>


<details><summary><b>Method :hammer_and_wrench: </b></summary>

Input                   |Type                       |Description
------------------------|---------------------------|-----------------------------------------------------
dropPane                |Promise - boolean          |Performs drop of the `draggedPane` into the specified `dropPosition`. Returns true if the pane has been docked otherwise returns false.
removePane              |Promise - void             |Removes a pane from the layout.
addEventListener        |void                       |
addEventListener        |void                       |
removeEventListener     |void                       |
removeEventListener     |void                       |

</details>
  
  
<table>
  <tr>
    <th colspan="2">Author Information</th>
  </tr>
  <tr>
    <td>Author</td>
    <td>DaiDH</td>
  </tr>
  <tr>
    <td>Phone</td>
    <td>+84845882882</td>
  </tr>
  <tr>
    <td>Country</td>
    <td>Vietnam</td>
  </tr>
</table>

#### If you want donate for me!

<table>
  <tr>
    <th>Bitcoin</th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/id1945/id1945/master/donate-bitcoin.png" width="182px"></td>
  </tr>
</table>

![Vietnam](https://raw.githubusercontent.com/id1945/id1945/master/vietnam.gif)
  
  
### License

[MIT License](https://github.com/id1945/ngx-flexlayout/blob/master/LICENSE). Copyright (c) 2021 DaiDH