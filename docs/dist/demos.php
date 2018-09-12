<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('./parts/head.php'); ?>
    <title>Highway - Demos</title>
</head>
<body>
    <main class="site-container">
        <?php include('./parts/header.php'); ?>

        <article id="top" class="site-content" data-router-view="demos">
            <h1>Demos</h1>
            <ul class="demos-list">
                <li><a href="https://kikk.be" target="_blank"><img src="./assets/images/demos/kikk.jpg"></a></li>
                <li><a href="https://galialahav.com" target="_blank"><img src="./assets/images/demos/galia.jpg"></a></li>
            </ul>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
