# 🌐 Browser Rendering Pipeline

When you open a webpage, the browser doesn't directly display the HTML file. It goes through several stages to convert code into visible pixels on your screen.

```text
HTML
 │
 ▼
Parsing
 │
 ▼
Tokenization
 │
 ▼
DOM Tree
 │
 ├──────────────────┐
 │                  │
 ▼                  ▼
CSS              CSS Parsing
 │                  │
 ▼                  ▼
CSS File        CSSOM Tree
 └──────────┬───────┘
            │
            ▼
    DOM Tree + CSSOM Tree
            │
            ▼
       Render Tree
            │
            ▼
          Layout
            │
            ▼
          Paint
            │
            ▼
      Composite Layers
            │
            ▼
      🎉 Display Screen
```

---

## 1️⃣ HTML

The browser downloads the HTML document.

```html
<h1>Hello World</h1>
<p>Welcome to the Web</p>
```

At this stage the browser only has raw text.

---

## 2️⃣ Parsing

The HTML parser starts reading the document character by character.

```html
<h1>Hello World</h1>
```

The browser tries to understand:

* Opening tags
* Closing tags
* Text content
* Attributes

---

## 3️⃣ Tokenization

The parser converts HTML into tokens.

```text
<h1>     → Start Tag Token
Hello    → Text Token
</h1>    → End Tag Token
```

Tokens are small pieces that the browser can understand.

---

## 4️⃣ DOM Tree Creation

Using tokens, the browser builds the **DOM (Document Object Model)**.

```text
Document
 └── html
      └── body
           ├── h1
           │    └── "Hello World"
           └── p
                └── "Welcome"
```

The DOM represents the structure of the webpage.

---

## 5️⃣ CSS Loading

When the browser encounters:

```html
<link rel="stylesheet" href="style.css">
```

it downloads the CSS file.

---

## 6️⃣ CSSOM Tree Creation

The CSS parser converts CSS rules into a **CSSOM Tree**.

```css
h1 {
    color: blue;
}

p {
    font-size: 18px;
}
```

Becomes:

```text
CSSOM
 ├── h1 → color: blue
 └── p  → font-size: 18px
```

The CSSOM contains styling information.

---

## 7️⃣ Render Tree

The browser combines:

```text
DOM Tree
    +
CSSOM Tree
```

to create:

```text
Render Tree
```

Example:

```text
h1 → color: blue
p  → font-size: 18px
```

The Render Tree contains:

✅ Structure

✅ Styles

❌ Hidden elements (`display: none`)

---

## 8️⃣ Layout (Reflow)

The browser calculates:

* Width
* Height
* Position
* Margins
* Spacing

Example:

```text
h1 → x:20 y:10
p  → x:20 y:80
```

Now the browser knows exactly where everything should appear.

---

## 9️⃣ Paint

The browser paints pixels.

```text
Background
Text
Borders
Shadows
Images
```

Everything gets drawn onto the screen.

---

## 🔟 Composite

Modern browsers create layers and combine them efficiently.

```text
Layer 1 → Background
Layer 2 → Text
Layer 3 → Animation
```

These layers are merged together.

---

# 🎉 Final Result

```text
HTML
  ↓
Parsing
  ↓
Tokenization
  ↓
DOM Tree

CSS
  ↓
CSSOM Tree

DOM + CSSOM
      ↓
 Render Tree
      ↓
   Layout
      ↓
   Paint
      ↓
 Composite
      ↓
 Display Screen
```

## 💡 Interview One-Liner

**DOM defines WHAT to render, CSSOM defines HOW to render, and together they create the Render Tree which the browser uses to paint pixels on the screen.**
