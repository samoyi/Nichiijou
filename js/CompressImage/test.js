
/**
 * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
 * @param {Image} source_img_obj The source Image Object
 * @param {Integer} quality The output quality of Image Object
 * @return {Image} result_image_obj The compressed Image Object
 */

function compress(source_img_obj, quality, output_format)
{
	 var mime_type = "image/jpeg";
	 if(output_format!=undefined && output_format=="png"){
		mime_type = "image/png";
	 } 
	 

	 var cvs = document.createElement('canvas');
	 //naturalWidth真实图片的宽度
	 cvs.width = source_img_obj.naturalWidth;
	 cvs.height = source_img_obj.naturalHeight;
	 var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
	 var newImageData = cvs.toDataURL(mime_type, quality/100);
	 var result_image_obj = new Image();
	 result_image_obj.src = newImageData;
	 return result_image_obj;
}


// 将图片转化为base64编码，发送到 sPostUrl
function handleFileSelect(sPostUrl, callback, ev) 
{
	// 获取用户选择的文件
	var oFile = (ev.target.files)[0]; 
		
    // 判断用户选择的文件是否是jpeg或者png。如果不是则报错。			
	if( oFile.type!=="image/jpeg" && oFile.type!=="image/png" ) {
	    throw new Error("File type must be JPG or PNG ");
	}
	
	// 创建FileReader实例
	var reader = new FileReader(),
		oImageFile = oFile,
		newImg = {};
	
	// 图片load后的处理函数
	function imageLoadedHandler(e)
	{	
		var oPreview = document.getElementById("preview");
		oPreview.src = e.target.result;

		// 根据图片大小按照不同比例进行压缩

		if( oImageFile.size>524288 ){ 
			var quality = 100/(oImageFile.size/524288);
			newImg = compress(oPreview, quality);
		}
		else{
			newImg.src = e.target.result;
		}
		
		
		function fnSuccess(xhr){
			console.log(xhr.responseText);
			callback(newImg.src);
		}
		function fnFail(xhrStatus){
			throw new Error("Fail to send compressed image");
		}
		let sData = "file_base64=" + encodeURIComponent(newImg.src.split(',')[1]);
		AjaxPost(sPostUrl, sData, fnSuccess, fnFail);
	}
	
	// FileReader实例绑定load事件
	reader.addEventListener("load", imageLoadedHandler);

	// 读取文件
	reader.readAsDataURL(oImageFile);
}




function AjaxPost(sUrl, sData, fnSuccess, fnFail)
{
	let xhr = new XMLHttpRequest();
	xhr.addEventListener('readystatechange', function()
	{	
		if (xhr.readyState == 4)
		{	
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				fnSuccess && fnSuccess(xhr);
			}
			else{
				fnFail && fnFail(xhr.status);
			}
		}
	}, false);
	xhr.open("post", sUrl, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(sData);
}