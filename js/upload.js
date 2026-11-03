'use strict';
$('#file').addEventListener('change', async e => {
  const f = e.target.files && e.target.files[0]; e.target.value = '';
  if (!f) return;
  try {
    const url = URL.createObjectURL(f); const img = new Image(); img.src = url; await img.decode();
    const s = Math.min(1, 1000 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth*s); c.height = Math.round(img.naturalHeight*s);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
    setSource(c, false); $('#scale').value = 1; $('#scaleOut').textContent = '100%';
    syncPressed(); render(); openEditor();
    toast('배경을 자동으로 지웠어요. 남은 부분만 다듬어 주세요.');
  } catch (err) {
    toast('이 사진은 열 수 없어요. JPG나 PNG 사진으로 다시 올려 주세요.');
  }
});

