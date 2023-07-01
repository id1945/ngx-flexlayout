import { Component, Host, Prop, h } from '@stencil/core';
import { addResourceStrings } from '../..';
import { IgcDockManagerPaneType, IgcDockingIndicatorPosition, IgcPaneDragActionType, IgcSplitPaneOrientation, IgcUnpinnedLocation } from '../dockmanager/dockmanager.public-interfaces';
/**
 * @hidden
 */
const customResourceStrings = {
  close: '[Custom]Close',
  pin: '[Custom]Pin',
  unpin: '[Custom]Unpin',
  maximize: '[Custom]Maximize',
  minimize: '[Custom]Minimize',
  moreOptions: '[Custom]More options'
};
addResourceStrings('custom', customResourceStrings);
/**
 * @hidden
 */
export class SampleComponent {
  constructor() {
    this.hiddenPanes = [];
    this.teamExplorerPane = {
      type: IgcDockManagerPaneType.contentPane,
      header: 'Team Explorer',
      contentId: 'content7',
      allowMaximize: true
    };
    this.unpinnedToolboxPane = {
      type: IgcDockManagerPaneType.contentPane,
      header: 'Toolbox',
      contentId: 'content1',
      isPinned: false,
      unpinnedHeaderId: "toolboxHeader"
    };
    this.unpinnedTeamExplorerPane = {
      type: IgcDockManagerPaneType.contentPane,
      header: 'Team Explorer',
      contentId: 'content14',
      isPinned: false,
      unpinnedHeaderId: "teamExplorerHeader"
    };
    this.layout1 = {
      rootPane: {
        type: IgcDockManagerPaneType.splitPane,
        orientation: IgcSplitPaneOrientation.horizontal,
        panes: [
          this.unpinnedToolboxPane,
          this.unpinnedTeamExplorerPane,
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            size: 300,
            panes: [
              {
                type: IgcDockManagerPaneType.documentHost,
                size: 300,
                rootPane: {
                  type: IgcDockManagerPaneType.splitPane,
                  orientation: IgcSplitPaneOrientation.horizontal,
                  allowEmpty: true,
                  panes: [
                    {
                      type: IgcDockManagerPaneType.tabGroupPane,
                      panes: [
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: 'MainWindow.xaml',
                          contentId: 'content2',
                          documentOnly: true,
                          // allowMaximize: false,
                        },
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: 'MainWindow.xaml.cs',
                          contentId: 'content6',
                          documentOnly: true,
                          allowFloating: false
                        }
                      ]
                    },
                    {
                      type: IgcDockManagerPaneType.contentPane,
                      header: 'App.xaml',
                      contentId: 'content8',
                      allowMaximize: true
                    }
                  ]
                }
              },
              {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.horizontal,
                allowEmpty: true,
                panes: []
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                header: 'Error List',
                contentId: 'content3',
                allowDocking: false,
                allowFloating: false,
                allowMaximize: false
              }
            ]
          },
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
              {
                type: IgcDockManagerPaneType.tabGroupPane,
                size: 200,
                allowEmpty: true,
                panes: [
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    header: 'Solution Explorer',
                    headerId: 'header1',
                    tabHeaderId: 'tabHeader1',
                    unpinnedHeaderId: 'unpinnedHeader1',
                    contentId: 'content4',
                    allowMaximize: false
                  },
                  this.teamExplorerPane
                ]
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                header: 'Properties',
                contentId: 'content5',
                unpinnedLocation: IgcUnpinnedLocation.top,
                allowFloating: false,
                allowMaximize: false
              }
            ]
          }
        ]
      },
      floatingPanes: [
        {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingLocation: { x: 50, y: 100 },
          floatingWidth: 200,
          floatingHeight: 100,
          panes: [
            {
              type: IgcDockManagerPaneType.contentPane,
              header: 'Notifications',
              contentId: 'content9',
              allowDocking: false
            }
          ],
          // floatingResizable: true
        },
        {
          type: IgcDockManagerPaneType.splitPane,
          allowEmpty: true,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingLocation: { x: 250, y: 350 },
          floatingWidth: 300,
          floatingHeight: 200,
          panes: [
            {
              type: IgcDockManagerPaneType.contentPane,
              header: 'Floating 1',
              contentId: 'content10'
            },
            {
              type: IgcDockManagerPaneType.contentPane,
              header: 'Floating 2',
              contentId: 'content11',
              allowMaximize: false
            }
          ]
        },
        {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingLocation: { x: 750, y: 200 },
          floatingWidth: 300,
          floatingHeight: 200,
          panes: [
            {
              type: IgcDockManagerPaneType.tabGroupPane,
              allowEmpty: true,
              panes: [
                {
                  type: IgcDockManagerPaneType.contentPane,
                  header: 'Floating Tab 1',
                  contentId: 'content12'
                },
                {
                  type: IgcDockManagerPaneType.contentPane,
                  header: 'Floating Tab 2',
                  contentId: 'content13'
                }
              ]
            }
          ]
        }
      ]
    };
    this.layout2 = {
      rootPane: {
        type: IgcDockManagerPaneType.splitPane,
        orientation: IgcSplitPaneOrientation.horizontal,
        panes: [
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: 'content1',
                header: 'Content Pane 1'
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: 'content2',
                header: 'Unpinned Pane 1',
                isPinned: false
              }
            ]
          },
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            size: 200,
            panes: [
              {
                type: IgcDockManagerPaneType.documentHost,
                size: 200,
                rootPane: {
                  type: IgcDockManagerPaneType.splitPane,
                  orientation: IgcSplitPaneOrientation.horizontal,
                  panes: [
                    {
                      type: IgcDockManagerPaneType.tabGroupPane,
                      panes: [
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: 'Document 1',
                          contentId: 'content3'
                        },
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: 'Document 2',
                          contentId: 'content4'
                        }
                      ]
                    }
                  ]
                }
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: 'content5',
                header: 'Unpinned Pane 2',
                isPinned: false
              }
            ]
          },
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
              {
                type: IgcDockManagerPaneType.tabGroupPane,
                size: 200,
                // selectedIndex: 1,
                panes: [
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content6',
                    header: 'Tab 1'
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content7',
                    header: 'Tab 2'
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content8',
                    header: 'Tab 3'
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content9',
                    header: 'Tab 4'
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content10',
                    header: 'Tab 5'
                  }
                ]
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: 'content11',
                header: 'Content Pane 2'
              }
            ]
          }
        ]
      },
      floatingPanes: [
        {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingHeight: 150,
          floatingWidth: 250,
          floatingLocation: { x: 300, y: 200 },
          panes: [
            {
              type: IgcDockManagerPaneType.contentPane,
              contentId: 'content12',
              header: 'Floating Pane'
            }
          ]
        }
      ]
    };
    this.layout = this.layout1;
    this.logEnabled = false;
    this.id = 100;
    this.foundElem = [];
  }
  saveLayout() {
    this.savedLayout = JSON.stringify(this.dockManager.layout);
  }
  loadLayout() {
    this.dockManager.layout = JSON.parse(this.savedLayout);
  }
  setActivePane() {
    // this.dockManager.activePane = this.teamExplorerPane;
    this.dockManager.activePane = this.unpinnedToolboxPane;
  }
  addPane() {
    this.newId = `content${this.id++}`;
    const newDiv = this.createElement(this.newId, 'input');
    this.dockManager.appendChild(newDiv);
    this.layout.floatingPanes[1].panes.push({
      type: IgcDockManagerPaneType.contentPane,
      header: 'NewPane',
      contentId: this.newId
    });
    this.dockManager.layout = Object.assign({}, this.layout);
  }
  addTab() {
    this.findElement(this.layout.rootPane, IgcDockManagerPaneType.tabGroupPane);
    this.newId = `content${this.id++}`;
    const newDiv = this.createElement(this.newId, 'button');
    this.dockManager.appendChild(newDiv);
    const tabGroupPane = this.foundElem[0];
    tabGroupPane.panes.push({
      type: IgcDockManagerPaneType.contentPane,
      header: 'NewTab',
      contentId: this.newId
    });
    this.dockManager.layout = Object.assign({}, this.layout);
  }
  disableContentPane() {
    this.findElement(this.layout.rootPane, IgcDockManagerPaneType.tabGroupPane);
    const tabGroupPane = this.foundElem[0];
    tabGroupPane.panes[0].disabled = true;
    this.dockManager.layout = Object.assign({}, this.layout);
  }
  findElement(pane, type) {
    if (!pane) {
      return;
    }
    if (pane.type === type) {
      this.foundElem.push(pane);
    }
    if (pane.type === IgcDockManagerPaneType.tabGroupPane || pane.type === IgcDockManagerPaneType.splitPane) {
      for (const c of pane.panes) {
        this.findElement(c, type);
      }
    }
    if (pane.type === IgcDockManagerPaneType.documentHost) {
      this.findElement(pane.rootPane, type);
    }
  }
  showPane() {
    const index = this.hiddenPanesSelect.selectedIndex;
    if (index >= 0) {
      this.hiddenPanes[index].hidden = false;
      this.hiddenPanes.splice(index, 1);
      this.hiddenPanes = [...this.hiddenPanes];
      this.dockManager.layout = Object.assign({}, this.dockManager.layout);
    }
  }
  showAllPanes() {
    if (this.hiddenPanes.length > 0) {
      for (const pane of this.hiddenPanes) {
        pane.hidden = false;
      }
      this.hiddenPanes = [];
      this.dockManager.layout = Object.assign({}, this.dockManager.layout);
    }
  }
  createElement(content, typeOfElement) {
    const someContent = document.createTextNode(content);
    let elem;
    switch (typeOfElement) {
      case ('button'):
        elem = document.createElement('button');
        elem.appendChild(someContent);
        break;
      case ('input'):
        elem = document.createElement('input');
        break;
    }
    const divContent = document.createElement('div');
    divContent.appendChild(elem ? elem : someContent);
    divContent.setAttribute('slot', content);
    divContent.setAttribute('style', 'width: 100%; height: 100%;');
    return divContent;
  }
  handlePaneClose(event) {
    this.log(event);
    if (this.hideOnCloseCheckbox.checked) {
      for (const pane of event.detail.panes) {
        pane.hidden = true;
        this.hiddenPanes.splice(0, 0, pane);
        this.hiddenPanes = [...this.hiddenPanes];
      }
      event.preventDefault();
    }
    // const panes = event.detail.panes;
    // const confirmed = confirm(`Are you sure you want to close panes '${panes.map(p => p.header).join(', ')}'?`);
    // // event.detail.panes = [panes[0]];
    // if (confirmed) {
    //   for (const pane of panes) {
    //     const contentChild = this.dockManager.querySelector(`[slot=${pane.contentId}]`);
    //     this.dockManager.removeChild(contentChild);
    //   }
    // } else {
    //   event.preventDefault();
    // }
  }
  handlePinnedToggle(event) {
    this.log(event);
    // if (event.detail.sourcePane.type === IgcDockManagerPaneType.contentPane) {
    //   event.detail.panes = [event.detail.sourcePane];
    // }
    // event.preventDefault();
  }
  handleActivePaneChanged(event) {
    this.log(event);
  }
  handleDragStart(event) {
    this.log(event);
    // event.preventDefault();
  }
  handleDragOver(event) {
    const args = event.detail;
    this.log(args.action);
    if (args.action.type === IgcPaneDragActionType.dockPane) {
      if (args.action.dockingIndicator.position === IgcDockingIndicatorPosition.left) {
        // args.isValid = false;
      }
    }
    else if (args.action.type === IgcPaneDragActionType.floatPane) {
      // args.action.height = Math.min(args.action.height, 500);
      // args.isValid = false;
    }
    else if (args.action.type === IgcPaneDragActionType.moveFloatingPane) {
      // if (args.action.newLocation.y < 0) {
      //   args.isValid = false;
      // }
    }
  }
  handleDragEnd(event) {
    this.log(event);
  }
  handleSplitterResizeStart(event) {
    this.log(event, Object.assign({}, event.detail));
    // event.preventDefault();
  }
  handleSplitterResizeEnd(event) {
    this.log(event, Object.assign({}, event.detail));
  }
  handleFloatingPaneResizeStart(event) {
    this.log(event, Object.assign({}, event.detail));
    // event.preventDefault();
  }
  handleFloatingPaneResizeMove(event) {
    this.log(event, Object.assign({}, event.detail));
  }
  handleFloatingPaneResizeEnd(event) {
    this.log(event, Object.assign({}, event.detail));
  }
  handleLayoutChange(event) {
    this.log(event);
  }
  // private getCustomResourceStrings(): IgcDockManagerResourceStrings {
  //   const customResourceStrings: IgcDockManagerResourceStrings = {
  //     close: '[Custom]Close',
  //     pin: '[Custom]Pin',
  //     unpin: '[Custom]Unpin',
  //     maximize: '[Custom]Maximize',
  //     minimize: '[Custom]Minimize',
  //     moreOptions: '[Custom]More options'
  //   };
  //   return customResourceStrings;
  // }
  log(message, ...optionalParams) {
    if (this.logEnabled) {
      console.log(message, optionalParams);
    }
  }
  render() {
    return (h(Host, null,
      h("div", null,
        h("button", { onClick: () => this.saveLayout() }, "Save Layout"),
        h("button", { onClick: () => this.loadLayout() }, "Load Layout"),
        h("button", { onClick: () => this.setActivePane() }, "Set Active Pane"),
        h("button", { onClick: () => this.addPane() }, "Add Floating Pane"),
        h("button", { onClick: () => this.addTab() }, "Add Tab Pane"),
        h("button", { onClick: () => this.disableContentPane() }, "Disable Tab Pane"),
        h("input", { id: "hideOnClose", type: "checkbox", style: { marginLeft: '20px' }, ref: el => this.hideOnCloseCheckbox = el }),
        h("label", { htmlFor: "hideOnClose" }, "Hide on close"),
        h("span", { style: { marginLeft: '20px' } }, "Hidden Panes:"),
        h("select", { style: { width: '150px' }, ref: el => this.hiddenPanesSelect = el }, this.hiddenPanes.map(p => {
          return (h("option", { value: p.id }, p.header));
        })),
        h("button", { onClick: () => this.showPane() }, "Show Pane"),
        h("button", { onClick: () => this.showAllPanes() }, "Show All Panes")),
      h("ngx-flexlayout", { layout: this.layout, onPaneClose: this.handlePaneClose.bind(this), onPanePinnedToggle: this.handlePinnedToggle.bind(this), onActivePaneChanged: this.handleActivePaneChanged.bind(this), onPaneDragStart: this.handleDragStart.bind(this), onPaneDragOver: this.handleDragOver.bind(this), onPaneDragEnd: this.handleDragEnd.bind(this), onSplitterResizeStart: this.handleSplitterResizeStart.bind(this), onSplitterResizeEnd: this.handleSplitterResizeEnd.bind(this), onFloatingPaneResizeStart: this.handleFloatingPaneResizeStart.bind(this), onFloatingPaneResizeMove: this.handleFloatingPaneResizeMove.bind(this), onFloatingPaneResizeEnd: this.handleFloatingPaneResizeEnd.bind(this), onLayoutChange: this.handleLayoutChange.bind(this), 
        // resourceStrings={this.getCustomResourceStrings()}
        ref: el => this.dockManager = el, 
        // allowFloatingPanesResize={false}
        showHeaderIconOnHover: 'closeOnly' },
        h("div", { slot: "header1" },
          h("span", { style: { color: 'red' } }, "Solution Explorer"),
          h("button", null, "H")),
        h("div", { slot: "tabHeader1" },
          h("span", { style: { color: 'orange' } }, "Solution Explorer"),
          h("button", null, "T")),
        h("div", { slot: "unpinnedHeader1" },
          h("span", { style: { color: 'blue' } }, "Solution Explorer"),
          h("button", null, "U")),
        h("button", { style: { background: 'pink' }, slot: "tabHeaderCloseButton" }, "Y"),
        h("div", { slot: "content1", style: { width: '100%', height: '100%' } }, "Content 1"),
        h("div", { slot: "content2", style: { width: '100%', height: '100%' } },
          h("button", null, "Tests")),
        h("div", { slot: "content3", style: { width: '100%', height: '100%' } }, "Content 3"),
        h("div", { slot: "content4" }, "Content 4"),
        h("div", { slot: "content5", style: { width: '100%', height: '100%' } }, "Content 5"),
        h("div", { slot: "content6", style: { width: '100%', height: '100%' } }, "Content 6"),
        h("div", { slot: "content7", style: { width: '100%', height: '100%' } }, "Content 7"),
        h("div", { slot: "content8" }, "Content 8"),
        h("div", { slot: "content9", style: { width: '100%', height: '100%' } }, "Content 9"),
        h("div", { slot: "content10", style: { width: '100%', height: '100%' } },
          h("button", null, "Test")),
        h("div", { slot: "content11", style: { width: '100%', height: '100%' } },
          h("input", null)),
        h("div", { slot: "content12", style: { width: '100%', height: '100%' } }, "Content 12"),
        h("div", { slot: "content13", style: { width: '100%', height: '100%' } }, "Content 13"),
        h("div", { slot: "content14", style: { width: '100%', height: '100%' } }, "Content 14"),
        h("div", { slot: "toolboxHeader" },
          h("span", null, "[U] Toolbox")),
        h("div", { slot: "teamExplorerHeader" },
          h("span", null, "[U] Team Explorer")))));
  }
  static get is() { return "sample-component"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["sample-component.css"]
  }; }
  static get styleUrls() { return {
    "$": ["sample-component.css"]
  }; }
  static get properties() { return {
    "hiddenPanes": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "IgcContentPane[]",
        "resolved": "IgcContentPane[]",
        "references": {
          "IgcContentPane": {
            "location": "import",
            "path": "../dockmanager/dockmanager.public-interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "[]"
    }
  }; }
}
