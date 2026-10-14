"""VKare Phase 16 static production smoke checks. Run: python3 tests/smoke.py"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
CSS = "\n".join((ROOT / path).read_text(encoding="utf-8") for path in ("assets/styles.css", "assets/premium.css"))
JS = (ROOT / "assets/app.js").read_text(encoding="utf-8")

class Scan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.refs = []
        self.forms = []
        self.images = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            assert a["id"] not in self.ids, f"Duplicate ID: {a['id']}"
            self.ids.add(a["id"])
        if tag in ("a", "link", "script", "img"):
            url = a.get("href") or a.get("src")
            if url: self.refs.append(url)
        if tag == "img": self.images.append(a)
        if tag == "form": self.forms.append(a)

scan = Scan()
scan.feed(HTML)
for ref in scan.refs:
    if ref.startswith(("./", "../")):
        path = unquote(urlsplit(ref).path)
        assert (ROOT / path).is_file(), f"Missing local asset: {ref}"
for required in ("contactForm", "shareBtn", "senderName", "senderEmail", "senderMobile", "senderMessage"):
    assert required in scan.ids, f"Missing functional element: {required}"
assert 'data-theme="dark"' in HTML
assert "finance-growth.png" in HTML and "finance-growth.png" in CSS
assert "vkare-logo.jpg" in HTML
assert "khagendra-mahant.vcf" in HTML
assert "tel:+919826619769" in HTML
assert "wa.me/919826619769" in HTML
assert "mailto:" in HTML and "mailto:connect@vkare.co.in" in JS
assert "navigator.share" in JS and "contactForm" in JS
assert re.search(r'<textarea[^>]*id="senderMessage"[^>]*required', HTML)
assert re.search(r'<input[^>]*id="senderEmail"[^>]*type="email"', HTML)
assert len(scan.forms) == 1
assert any("profile" in img.get("class", "").split() for img in scan.images)
assert all("alt" in img for img in scan.images)
assert "premium.css" in HTML
assert "prefers-reduced-motion" in CSS
assert "safe-area-inset-bottom" in CSS
print("PASS: local assets, critical links, contact elements, branding, dark theme, and accessibility safeguards")
