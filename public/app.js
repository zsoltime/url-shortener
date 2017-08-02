// forked from https://github.com/sindresorhus/copy-text-to-clipboard

function copy(input) {
	const el = document.createElement('textarea');
	el.value = input;
	el.setAttribute('readonly', '');
  el.setAttribute('style', 'contain:strict; position:absolute; left:-9999px; font-size:12pt');

	const selection = getSelection();

	let originalRange = false;
	if (selection.rangeCount > 0) {
		originalRange = selection.getRangeAt(0);
	}

	document.body.appendChild(el);
	el.select();

	let success = false;
	try {
		success = document.execCommand('copy');
	} catch (err) {}

	document.body.removeChild(el);

	if (originalRange) {
		selection.removeAllRanges();
		selection.addRange(originalRange);
	}
	return success;
}

(function() {
  const form = document.getElementById('form');
  const response = document.getElementById('response');
  const shorturl = document.getElementById('shorturl');

  function handleClick(e) {
    copy(e.target.textContent);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = encodeURIComponent(form.elements['url'].value);
    if (!url) {
      return;
    }
    fetch(`/shorten/${url}`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          return;
        }
        response.innerHTML = JSON.stringify(res, null, 2);
        shorturl.innerText = res.short;
      });
  }
  shorturl.addEventListener('click', handleClick);
  form.addEventListener('submit', handleSubmit);
}());
