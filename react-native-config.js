module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        sourceDir: '../node_modules/react-native-sqlite-storage/platforms/ios',
      },
    },
    'react-native-sqlite-storage': {
      platforms: {
        android: {
          sourceDir:
            '../node_modules/react-native-sqlite-storage/platforms/android-native',
          packageImportPath: 'import io.liteglue.SQLitePluginPackage;',
          packageInstance: 'new SQLitePluginPackage()',
        },
      },
    },
  },
};
