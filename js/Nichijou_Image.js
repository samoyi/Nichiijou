

// 根据图片 URL 获得其 ImageData 数组
{
	function URL2ImageData (sURL) {
		return new Promise((resolve, reject) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			const img = new Image;
			img.addEventListener('load', function(){
				canvas.width = this.naturalWidth;
				canvas.height = this.naturalHeight;
				ctx.drawImage(this, 0, 0);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
				resolve(imageData);
			});
			img.addEventListener('error', function(){
				reject('Fail to load image');
			});
			img.src = sURL;
		});
	}
}
