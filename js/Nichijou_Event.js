
// 模拟事件
/*
*  可以传入一个对象作为第三个参数，用于重写和补充 defaultEventProperties
*
*/
/*
*  TODO
*    1. 目前只支持 eventsCanSimulate 中的事件
*    2. 这里模拟事件的方法已经被废弃
*/
{
	function simulateEvent(element, eventName)
	{
		let eventsCanSimulate = {
			'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
			'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
		};
		let defaultEventProperties = {
			pointerX: 0,
			pointerY: 0,
			button: 0,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			metaKey: false,
			bubbles: true,
			cancelable: true
		};

		let options = Object.assign(defaultEventProperties, arguments[2] || {});
		let oEvent, eventType = null;

		for (let name in eventsCanSimulate)
		{
			if (eventsCanSimulate[name].test(eventName))
			{
				eventType = name;
				break;
			}
		}

		if (!eventType)
		throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

		if (document.createEvent)
		{
			oEvent = document.createEvent(eventType);
			switch(eventType)
			{
				case "HTMLEvents":
				{
					oEvent.initEvent(eventName, options.bubbles, options.cancelable);
					break;
				}
				case "MouseEvents":
				{
					oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
						options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
						options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
						break;
				}
			}
			element.dispatchEvent(oEvent);
		}
		else
		{
			options.clientX = options.pointerX;
			options.clientY = options.pointerY;
			let evt = document.createEventObject();
			oEvent = Object.assign(evt, options);
			element.fireEvent('on' + eventName, oEvent);
		}
		return element;
	}
}
