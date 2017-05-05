"use strict";


// 查看一个节点是否是另一个节点的后辈（内部）节点
function isOffspringNode(offspringNode, ancestorNode)
{
	while( offspringNode!==document && offspringNode!==window )
	{
		if( offspringNode.parentNode === ancestorNode ){
			return true;
		}
		else{
			offspringNode = offspringNode.parentNode;
		}
	}
	return false;
}
