import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isEditing?: boolean;
  expanded?: boolean;   // <— add this
}
@Component({
  selector: 'app-tree-input',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './tree-input.html',
  styleUrl: './tree-input.scss'
})
export class TreeInput {
  @Input() nodes: TreeNode[] = [];
  @Output() nodesChange = new EventEmitter<TreeNode[]>();

  addChild(node: TreeNode) {
    if (!node.children) node.children = [];
    node.children.push({
      id: crypto.randomUUID(),
      name: 'New Node',
      children: []
    });
    this.nodesChange.emit(this.nodes);
  }

  editNode(node: TreeNode) {
    node.isEditing = true;
  }

  applyEdit(node: TreeNode, newName: string) {
    node.name = newName;
    node.isEditing = false;
    this.nodesChange.emit(this.nodes);
  }

  deleteNode(targetNode: TreeNode, nodes: TreeNode[]) {
    const index = nodes.indexOf(targetNode);
    if (index > -1) {
      nodes.splice(index, 1);
      this.nodesChange.emit(this.nodes);
    }
  }
}
