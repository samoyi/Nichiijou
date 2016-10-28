"use strict";

function Nichijou_Event(name, age, job)
{
	
	// common properties ---------------------------------------------------------------------------------------
	
	
	
    // common functions ----------------------------------------------------------------------------------------
	
	

    

    // public properties ---------------------------------------------------------------------------------------
    


    
    // public methods ------------------------------------------------------------------------------------------
    if (typeof this.simulateEvent != "function")
    {
        // 模拟事件
        /*
         *  
         *  
         */
		/* 
		 *  TODO  目前只支持 eventsCanSimulate 中的事件
		 */	
        Nichijou_Event.prototype.simulateEvent = function simulateEvent(element, eventName)
		{
			let eventsCanSimulate = {
				'HTMLEvent': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
				'MouseEvent': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
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
				if (eventType == 'HTMLEvents')
				{
					oEvent.initEvent(eventName, options.bubbles, options.cancelable);
				}
				else
				{
					oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
					options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
					options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
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
}







  
