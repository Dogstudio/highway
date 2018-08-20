<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('./parts/head.php'); ?>
</head>
<body>
    <main class="site-container">
        <?php include('./parts/header.php'); ?>

        <article class="site-content" data-router-view="about">
            <h1>About</h1>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
