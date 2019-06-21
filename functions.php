<?php

define('ROOT', __DIR__ . DIRECTORY_SEPARATOR . 'components' . DIRECTORY_SEPARATOR);

/**
 * Get template part from path
 *
 * @param string $file - file path
 * @param array $vars - view variables
 * @param boolean $render - rendering
 */
function get_part($file, $vars = [], $render = true) {
  if (file_exists(ROOT . $file . '.php')) {
    ob_start();
    extract($vars);

    include( ROOT . $file . '.php' );
    $view = ob_get_clean();

    if ($render == false) return $view;
    echo $view;
  }
}
