<?php include('./parts/console.php'); ?>

<header class="site-header">
    <a href="/" class="site-logo"><img src="./assets/images/logo_2x.png" /></a>

    <nav class="site-menu">
        <ul>
            <li class="menu-item"><a href="/">Home</a></li>
            <li class="menu-item"><a href="/about.php">About</a></li>
            <li class="menu-parent">
                <a href="/features.php">Features</a>

                <ul class="menu-child">
                    <li class="menu-item"><a href="/features.php#renderers">Renderers</a></li>
                    <li class="menu-item"><a href="/features.php#transitions">Transitions</a></li>
                </ul>
            </li>
            <li class="menu-item"><a href="/examples.php">Examples</a></li>
        </ul>
    </nav>
</header>
