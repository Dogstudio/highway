<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('./parts/head.php'); ?>
    <title>Highway - Examples</title>
</head>
<body>
    <main class="site-container">
        <?php include('./parts/header.php'); ?>

        <article id="top" class="site-content" data-router-view="examples">
            <h1>Examples</h1>
            <h2>Forms</h2>
            <p>Form submission is not considered as a navigation so it <strong>hard reloads</strong> the page by default. We have to consider using AJAX validation and the <em>Core</em>.<strong>redirect(<em>href</em>)</strong> method if we want to redirect our users to a <em>Thank you</em> page.</p>

            <form action="#" method="POST">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Try me!</button>
            </form>

            <h2>Disable links</h2>
            <p>All links using with a different origin, a <strong>target</strong> attribute or a <strong>data-router-disabled</strong> attribute are going to be ignored by <strong>Highway</strong>. We have then some options in our hand to manipulate our links the way we want.</p>
            
            <h3>[data-router-disabled]</h3>
            <p>All links using the <strong>data-router-disabled</strong> attribute are automatically ignored by <strong>Highway</strong>.</p>
            <?php include('./snippets/disabled.php'); ?>
            <p><a href="mailto:john@doe.com" data-router-disabled class="button">Try me!</a></p>

            <h3>Same window</h3>
            <p>We can force a link to be ignored by <strong>Highway</strong> and open in the same window by using:</p>
            <?php include('./snippets/self.php'); ?>
            <p><a href="./index.php" target="_self" class="button">Try me!</a></p>

            <h3>New window</h3>
            <p>We can force a link to be ignored by <strong>Highway</strong> and open in a new window by using:</p>
            <?php include('./snippets/blank.php'); ?>
            <p><a href="./index.php" target="_blank" class="button">Try me!</a></p>

            <h3>Cross-origin</h3>
            <p>All links with a different origin are ignored by <strong>Highway</strong>:</p>
            <?php include('./snippets/cors.php'); ?>
            <p><a href="http://google.be" class="button">Try me!</a></p>

            <h2>URL Parameters</h2>
            <p>We might often need to add parameters to our URL for some reasons but keep in mind that all parameters added to the page URL by links will launch the transitions even if the URL pathname is the <strong>same</strong>.</p>
            
            <h3>Same page</h3>
            <p>This example should launch the transition even if the URL pathname is the <strong>same</strong>.</p>
            <?php include('./snippets/params-same.php'); ?>
            <p><a href="./examples.php?foo=bar" class="button">Try me!</a></p>

            <h3>Other page</h3>
            <p>This example should launch the transition because the URL pathname is <strong>different</strong>.</p>
            <?php include('./snippets/params-other.php'); ?>
            <p><a href="./index.php?foo=bar" class="button">Try me!</a></p>

            <h2>Anchors</h2>

            <h3>Same page</h3>
            <p>We might often need to create anchors in our pages and add links to navigate to them but keep in mind that all anchors URL will <strong>hard reload</strong> the page if the URL pathname is the <strong>same</strong>.</p>
            <?php include('./snippets/anchor-same.php'); ?>
            <p><a href="#top" class="button">Try me!</a></p>

            <h3>Other page</h3>
            <p>However if the URL pathname is <strong>different</strong> the transition will be launched but you'll have to manage yourself the scroll to the right anchor when it'll be over. Luckily we have an example for this stuff:</p>
            <?php include('./snippets/anchor-other.php'); ?>
            <?php include('./snippets/anchor-other-bis.php'); ?>
            <p><a href="./get-started.php#core" class="button">Try me!</a></p>

            <h2>Active Menu</h2>
            <p>We dealing with menus we like to show the active item when we are on a page using CSS for accessibility purposes or others. To do so we can use events to show the right active menu item.<br> Here is an example to do it:</p>
            <?php include('./snippets/menu.php'); ?>

            <h2>Analytics</h2>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
