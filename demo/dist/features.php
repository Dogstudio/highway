<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('./parts/head.php'); ?>
</head>
<body>
    <main>
        <?php include('./parts/header.php'); ?>

        <article data-router-view="features">
            <h1>Features</h1>

            <ul>
              <li><a href="#renderers">Renderers</a></li>
              <li><a href="#transitions">Transitions</a></li>
            </ul>

            <section id="renderers">
              <h2>Renderers</h2>
            </section>

            <section id="transitions">
              <h2>Transitions</h2>
            </section>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>

